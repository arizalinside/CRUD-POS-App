const router = require("express").Router();
const { getAllOrder, getOrderById, postOrder } = require("../controller/order");
const {
  getAllOrderRedis,
  getOrderByIdRedis,
  clearDataOrderRedis,
} = require("../middleware/redis");
const { authorization } = require("../middleware/auth");

router.get("/", authorization, getAllOrderRedis, getAllOrder);
router.get("/:id", authorization, getOrderByIdRedis, getOrderById);
router.post("/", authorization, postOrder);

module.exports = router;
