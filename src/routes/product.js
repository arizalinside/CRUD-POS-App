const router = require('express').Router()
const { getAllProduct, getProductById, postProduct, patchProduct, deleteProduct } = require('../controller/product')

// [GET]
router.get('/', getAllProduct);

// [GET BY ID]
router.get('/:id', getProductById);

// [POST]
router.post('/', postProduct);

// [PATCH/PUT]
router.patch('/:id', patchProduct);

// [DELETE]
router.delete('/:id', deleteProduct);

module.exports = router