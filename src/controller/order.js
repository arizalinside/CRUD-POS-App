const { getAllOrder, getOrderById, postOrder } = require('../model/order')
const helper = require('../helper/index')

module.exports = {
    getAllOrder: async (request, response) => {
        try {
            const result = await getAllOrder();
            return helper.response(response, 200, 'Success Get Order', result)
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    },
    getOrderById: async (request, response) => {
        try {
            const { id } = request.params
            const result = await getOrderById();
            if (result.length > 0) {
                return helper.response(response, 200, 'Success Get Order By Id', result)
            } else {
                return helper.response(responce, 404, `Product By Id : ${id} Not Found`, error)
            }
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    },
    postOrder: async (request, response) => {
        try {
            const setData = {
                product_id: request.body.product_id,
                order_qty: request.body.qty
            }
            const result = await postOrder(setData)
            return helper.response(response, 201, 'Order Created', result)
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    }
}