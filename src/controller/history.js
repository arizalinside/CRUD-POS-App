const {
  getAllHistory,
  getHistoryCount,
  getHistoryById,
  patchHistory,
} = require("../model/history");
const { getOrderByHistoryId } = require("../model/order");
const qs = require("querystring");
const helper = require("../helper/index");

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
  getAllHistory: async (request, response) => {
    let { page, limit, sort } = request.query;
    page = parseInt(page);
    limit = parseInt(limit);
    // page === undefined ? page = 1 : page = parseInt(page)
    // limit === undefined ? limit = 3 : limit = parseInt(limit)
    // if (sort === undefined) {
    //     sort = 'history_id'
    // }

    const totalData = await getHistoryCount();
    const totalPage = Math.ceil(totalData / limit);
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, request.query);
    let nextLink = getNextLink(page, totalPage, request.query);

    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/history?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/history?${nextLink}`,
    };
    try {
      const result = await getAllHistory(limit, offset, sort);
      for (let i = 0; i < result.length; i++) {
        result[i].orders = await getOrderByHistoryId(result[i].history_id);
        let total = 0;
        result[i].orders.forEach((value) => {
          total += value.order_subtotal;
        });
        const tax = total * 0.05;
        result[i].tax = tax;
      }
      return helper.response(
        response,
        201,
        "Success Get History",
        result,
        pageInfo
      );
    } catch (error) {
      console.log(error);
      // return helper.response(response, 404, 'Bad Request', error)
    }
  },
  getHistoryById: async (request, response) => {
    try {
      const { id } = request.params;
      const dataHistory = await getHistoryById(id);
      const dataOrder = await getOrderByHistoryId(id);
      let total = 0;
      dataOrder.forEach((value) => {
        total += value.order_subtotal;
      });
      const tax = total * 0.05;
      const result = {
        history_id: dataHistory[0].history_id,
        invoice: dataHistory[0].history_invoices,
        orders: dataOrder,
        tax,
        subtotal: dataHistory[0].history_subtotal,
        history_created_at: dataHistory[0].history_created_at,
      };
      return helper.response(response, 201, `Success Get History`, result);
    } catch (error) {
      // console.log(error)
      return helper.response(response, 404, "Bad Request", error);
    }
  },
};
