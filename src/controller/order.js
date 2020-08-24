const {
  getAllOrder,
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
const helper = require("../helper/index");

module.exports = {
  getAllOrder: async (request, response) => {
    try {
      const result = await getAllOrder();
      return helper.response(response, 200, "Success Get Order", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getOrderById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getOrderById();
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Get Order By Id",
          result
        );
      } else {
        return helper.response(
          responce,
          404,
          `Product By Id : ${id} Not Found`,
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
      const tax = subtotal * 0.05;
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
