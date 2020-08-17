const { getAllHistory, getHistoryById, patchHistory } = require('../model/history')
const { getOrderByHistoryId } = require('../model/order')
const helper = require('../helper/index')

module.exports = {
    getAllHistory: async (request, response) => {
        let { page, limit, sort } = request.query
        page === undefined ? page = 1 : page = parseInt(page)
        limit === undefined ? limit = 3 : limit = parseInt(limit)
        if (sort === undefined) {
            sort = 'history_id'
        }

        const totalData = await getProductCount()
        const totalPage = Math.ceil(totalData / limit)
        let offset = page * limit - limit
        let prevLink = getPrevLink(page, request.query)
        let nextLink = getNextLink(page, totalPage, request.query)

        const pageInfo = {
            page,
            totalpage,
            limit,
            totalData,
            prevLink: prevLink && `http://127.0.0.1:3001/history?${prevLink}`,
            nextLink: nextLink && `http://127.0.0.1:3001/history?${nextLink}`
        }
        try {
            const result = await getAllHistory(limit, offset, sort);
            return helper.response(response, 201, 'Success Get History', result)
        } catch (error) {
            return helper.response(response, 404, 'Bad Request', error)
        }
    },
    getHistoryById: async (request, response) => {
        try {
            const { id } = request.params
            const result = await getHistoryById(id);
            if (result.length > 0) {
                return helper.response(repsonse, 201, 'Success Get History By ID', result)
            } else {
                return helper.response(response, 404, `History By Id : ${$} Not Found`)
            }
        } catch (error) {
            return helper.response(response, 404, 'Bad Request', error)
        }
    },
    postHistory: async (request, response) => {
        try {
            const { id } = request.params
            const dataHistory = await getHistoryById(id)
            const dataOrderByHistory = await getOrderByHistoryId(id)
            let total = 0
            dataOrderByHistory.forEach(data => {
                total += total.order_subtotal
            })
            const tax = total * 0.05
            const { history_id, history_invoices, history_subtotal, history_created_at } = dataHistory[0]
            const result = {
                history_id,
                history_invoices,
                orders: dataOrderByHistory,
                tax,
                history_subtotal,
                history_created_at
            }
            return helper.response(response, 201, 'History Created', result)
        } catch (error) {
            return helper.response(response, 404, 'Bad Request', error)
        }
    },
    patchHistory: async (request, response) => {
        try {
            const { id } = request.params
            const setData = {
                history_id: request.body.history_id,
                history_invoices: Math.floor(100000 + Math.random() * 900000),
                history_subtotal: request.body.history_subtotal,
                history_created_at: new Date()
            }
            const checkId = await getHistoryById(id)
            if (checkId.length > 0) {
                const result = await patchHistory(setData, id)
                return helper.response(response, 201, 'History Updated', result)
            } else {
                return helper.response(response, 404, `History By Id : ${id} Not Found`, error)
            }
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    }
}