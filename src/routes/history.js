const router = require('express').Router()
const { getAllHistory, getHistoryById, postHistory, patchHistory } = require('../controller/history')

// [GET]
router.get('/', getAllHistory)

// [GET BY ID]
router.get('/:id', getHistoryById)

// [POST]
router.post('/', postHistory)

// [PATCH]
router.patch('/:id', patchHistory)

module.exports = router