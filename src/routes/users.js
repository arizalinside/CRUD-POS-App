const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getUser,
  patchUser,
} = require("../controller/users");
const { adminAuth } = require("../middleware/auth");
const { userRedis, clearUserRedis } = require("../middleware/redis");

router.get("/", adminAuth, userRedis, getUser);
router.post("/login", loginUser);
router.post("/register", registerUser, clearUserRedis);
router.patch("/:id", adminAuth, clearUserRedis, patchUser);

module.exports = router;
