const router = require('express').Router()
const { getAllCategory, getCategroyByName, getCategoryById, postCategory, patchCategory, deleteCategory } = require('../controller/category')
const { getAllCategoryRedis, getCategoryByNameRedis, getCategoryByIdRedis, clearDataCategoryRedis } = require('../middleware/redis');
const { authorization } = require('../middleware/auth')

// [GET]
router.get('/', authorization, getAllCategoryRedis, getAllCategory);
router.get('/search', authorization, getCategoryByNameRedis, getCategroyByName);

// [GET BY ID]
router.get('/:id', authorization, getCategoryByIdRedis, getCategoryById);

// [POST]
router.post('/', authorization, postCategory);

// [PATCH/PUT]
router.patch('/:id', authorization, clearDataCategoryRedis, patchCategory);

// [DELETE]
router.delete('/:id', authorization, clearDataCategoryRedis, deleteCategory);

module.exports = router