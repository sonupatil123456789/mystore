const express = require("express")
const router = express.Router()
const{creatProduct,fetchAllProducts,fetchAllProductsByCategory,updateProductInfo} = require("../controller/productController")

router.get("/fetchAllProducts",fetchAllProducts)
router.get("/fetchProducts/byCategory/:categoryId",fetchAllProductsByCategory)
router.route("/creatProduct/new").post(creatProduct)
router.route("/updateProducts").put(updateProductInfo)

module.exports = router