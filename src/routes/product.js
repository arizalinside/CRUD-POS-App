const router = require("express").Router();
const {
  getProduct,
  getProductByName,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../controller/product");
const { adminAuth, authorization } = require("../middleware/auth");
const {
  getProductRedis,
  getProductByNameRedis,
  getProductByIdRedis,
  clearDataProductRedis,
} = require("../middleware/redis");
const upload = require("../middleware/multer");

router.get("/", authorization, getProductRedis, getProduct);
router.get("/search", authorization, getProductByNameRedis, getProductByName);
router.get("/:id", authorization, getProductByIdRedis, getProductById);
router.post("/", authorization, upload, clearDataProductRedis, postProduct);
router.patch(
  "/:id",
  authorization,
  upload,
  clearDataProductRedis,
  patchProduct
);
router.delete("/:id", authorization, clearDataProductRedis, deleteProduct);

module.exports = router;
