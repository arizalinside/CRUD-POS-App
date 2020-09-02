const router = require("express").Router();
const {
  getProduct,
  getProductByName,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../controller/product");
const { authorization } = require('../middleware/auth')
const { getProductRedis, getProductByNameRedis, getProductByIdRedis, clearDataProductRedis } = require('../middleware/redis')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, './uploads/')
  },
  filename: (request, file, callback) => {
    // console.log(file)
    callback(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname
    )
  }
})
let upload = multer({ storage: storage })

// [GET]
router.get("/", authorization, getProductRedis, getProduct);
router.get("/search", authorization, getProductByNameRedis, getProductByName);
router.get("/:id", authorization, getProductByIdRedis, getProductById);

// [POST]
router.post("/", authorization, upload.single('product_image'), postProduct);

// [PATCH]
router.patch("/:id", authorization, clearDataProductRedis, upload.single('product_image'), patchProduct);

// [DELETE]
router.delete("/:id", authorization, clearDataProductRedis, deleteProduct);

module.exports = router;
