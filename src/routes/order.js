const router = require('express').Router()
const { getAllOrder, getOrderById, postOrder } = require('../controller/order')
const { getAllOrderRedis, getOrderByIdRedis, clearDataOrderRedis } = require('../middleware/redis')
const { authorization } = require('../middleware/auth')

// [GET]
router.get('/', authorization, getAllOrderRedis, getAllOrder)

// [GET BY ID]
router.get('/:id', authorization, getOrderByIdRedis, getOrderById)

// [POST]
router.post('/', authorization, postOrder)

module.exports = router