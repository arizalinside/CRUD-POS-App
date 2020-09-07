const router = require("express").Router();
const {
  getAllCategory,
  getCategroyByName,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/category");
const {
  getAllCategoryRedis,
  getCategoryByNameRedis,
  getCategoryByIdRedis,
  clearDataCategoryRedis,
} = require("../middleware/redis");
const { authorization } = require("../middleware/auth");

router.get("/", authorization, getAllCategoryRedis, getAllCategory);
router.get("/search", authorization, getCategoryByNameRedis, getCategroyByName);
router.get("/:id", authorization, getCategoryByIdRedis, getCategoryById);
router.post("/", authorization, postCategory);
router.patch("/:id", authorization, clearDataCategoryRedis, patchCategory);
router.delete("/:id", authorization, clearDataCategoryRedis, deleteCategory);

module.exports = router;
