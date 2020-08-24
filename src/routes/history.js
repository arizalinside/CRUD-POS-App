const router = require("express").Router();
const { getAllHistory, getHistoryById } = require("../controller/history");

// [GET]
router.get("/", getAllHistory);

// [GET BY ID]
router.get("/:id", getHistoryById);

module.exports = router;
