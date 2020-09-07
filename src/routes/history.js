const router = require("express").Router();
const {
  getAllHistory,
  getSumChart,
  getHistoryToday,
  getHistoryWeek,
  getHistoryMonth,
  getTotalIncome,
  getTotalIncomeYear,
  getCountHistoryWeek,
  getHistoryById,
} = require("../controller/history");
const { authorization } = require("../middleware/auth");
const {
  getAllHistoryRedis,
  getHistoryByIdRedis,
} = require("../middleware/redis");

router.get("/", authorization, getAllHistoryRedis, getAllHistory);
router.get("/chart", getSumChart);
router.get("/today", getHistoryToday);
router.get("/week", getHistoryWeek);
router.get("/month", getHistoryMonth);
router.get("/income", getTotalIncome);
router.get("/incomeyear", getTotalIncomeYear);
router.get("/count", getCountHistoryWeek);
router.get("/:id", authorization, getHistoryByIdRedis, getHistoryById);

module.exports = router;
