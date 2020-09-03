const {
  getAllOrder,
  getOrderCount,
  getOrderById,
  getOrderByHistoryId,
  postOrder,
} = require("../model/order");
const {
  getHistoryById,
  postHistory,
  patchHistory,
} = require("../model/history");
const { getProductById } = require("../model/product");
const qs = require('qs')
const helper = require("../helper/index");
const redis = require('redis')
const client = redis.createClient()

const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatedPage = {
      page: page - 1,
    };
    const resultPrevLink = { ...currentQuery, ...generatedPage };
    return qs.stringify(resultPrevLink);
  } else {
    return null;
  }
};

const getNextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatedPage = {
      page: page + 1,
    };
    const resultNextLink = { ...currentQuery, ...generatedPage };
    return qs.stringify(resultNextLink);
  } else {
    return null;
  }
};

module.exports = {
  getAllOrder: async (request, response) => {
    let { page, limit, sort } = request.query;
    page = parseInt(page);
    limit = parseInt(limit);
    // page === undefined || page === '' ? page = 1 : parseInt(page)
    // limit === undefined || page === '' ? limit = 3 : parseInt(limit)
    // if (sort === undefined || sort === '') {
    //     sort = 'product_id'
    // }
    const totalData = await getOrderCount();
    const totalPage = Math.ceil(totalData / limit);
    const offset = page * limit - limit;
    const prevLink = getPrevLink(page, request.query);
    const nextLink = getNextLink(page, totalPage, request.query);
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/orders?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/orders?${nextLink}`,
    };
    try {
      const result = await getAllOrder(limit, offset, sort);
      const newResult = {
        result,
        pageInfo
      }
      client.setex('getallorder', 3600, JSON.stringify(newResult))
      return helper.response(response, 200, "Success Get Order", result, pageInfo);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getOrderById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getOrderById(id);
      if (result.length > 0) {
        client.setex(`getorderbyid:${id}`, 3600, JSON.stringify(result))
        return helper.response(
          response,
          200,
          `Get Order ID: ${id}, Success!`,
          result
        );
      } else {
        return helper.response(
          responce,
          404,
          `Order By ID: ${id} Not Found`,
          error
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postOrder: async (request, response) => {
    try {
      const setData = {
        history_invoices: Math.floor(100000 + Math.random() * 900000),
        history_subtotal: 0,
        history_created_at: new Date(),
      };
      const result = await postHistory(setData);
      const historyId = result.history_id;
      const dataOrder = request.body.orders;
      let subtotal = 0;
      for (let i = 0; i < dataOrder.length; i++) {
        const productId = dataOrder[i].product_id;
        const orderQty = dataOrder[i].order_qty;
        const getProductId = await getProductById(productId);
        const dataProduct = getProductId[0];
        const productPrice = dataProduct.product_price;
        const setData2 = {
          history_id: historyId,
          product_id: productId,
          order_qty: orderQty,
          order_subtotal: orderQty * productPrice,
        };
        const result2 = await postOrder(setData2);
        subtotal += result2.order_subtotal;
      }
      const tax = subtotal * 0.1;
      const totalPrice = subtotal + tax;
      const setData3 = {
        history_subtotal: totalPrice,
      };
      await patchHistory(setData3, historyId);
      const dataHistory = await getHistoryById(historyId);
      const dataOrderByHistory = await getOrderByHistoryId(historyId);
      const {
        history_id,
        history_invoices,
        history_subtotal,
        history_created_at,
      } = dataHistory[0];
      const checkout = {
        history_id,
        history_invoices,
        orders: dataOrderByHistory,
        tax,
        history_subtotal,
        history_created_at,
      };
      return helper.response(response, 201, "Order Created", checkout);
    } catch (error) {
      // console.log(error)
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
