const router = require('express').Router()
const { getAllOrder, getOrderById, postOrder } = require('../controller/order')

// [GET]
router.get('/', getAllOrder)

// [GET BY ID]
router.get('/:id', getOrderById)

// [POST]
router.post('/:id', postOrder)

module.exports = router