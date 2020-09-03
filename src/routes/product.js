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
let upload = multer({
  storage: storage,
  fileFilter: (request, file, callback) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      callback(null, true)
    } else {
      callback(null, false)
      return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

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
