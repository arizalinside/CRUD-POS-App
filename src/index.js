const route = require('express').Router()

// import route disini
const product = require('./routes/product')
const category = require('./routes/category')
const order = require('./routes/order')
const history = require('./routes/history')

// buat middle disini
route.use('/product', product)
route.use('/category', category)
route.use('/orders', order)
route.use('/history', history)

module.exports = route