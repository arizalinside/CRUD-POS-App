const { getAllHistory, getHistoryById, postHistory, patchHistory } = require('../model/history')
const helper = require('../helper/index')

module.exports = {
    getAllHistory: async (request, response) => {
        try {
            const result = await getAllHistory();
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
            const setData = {
                history_id: request.body.history_id,
                invoices: Math.random().slice(0, 7),
                amount: request.boyd.amount,
                history_created_at: new Date()
            }
            const result = await postHistory(setData);
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
                invoices: Math.random().slice(0, 7),
                amount: request.body.amount,
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