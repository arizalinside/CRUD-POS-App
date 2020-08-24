const router = require("express").Router();
const {
  getProduct,
  getProductByName,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../controller/product");

// [GET]
router.get("/", getProduct);
router.get("/search", getProductByName);
router.get("/:id", getProductById);

// [POST]
router.post("/", postProduct);

// [PATCH]
router.patch("/:id", patchProduct);

// [DELETE]
router.delete("/:id", deleteProduct);

module.exports = router;
