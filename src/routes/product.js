const router = require('express').Router()
const {
    getProduct,
    getProductById,
    getProductByName,
    getProductNameSorted,
    getProductCategorySorted,
    getProductDateSorted,
    getProductPriceSorted,
    postProduct,
    patchProduct,
    deleteProduct } = require('../controller/product')

// [GET]
router.get('/', getProduct);

router.get('/:id', getProductById);

router.get('/search/:keyword', getProductByName);

// [POST]
router.post('/', postProduct);

// [PATCH/PUT]
router.patch('/:id', patchProduct);

// [DELETE]
router.delete('/:id', deleteProduct);

module.exports = router