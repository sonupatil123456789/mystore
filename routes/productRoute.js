const express = require("express")
const router = express.Router()
const{creatProduct,fetchAllProducts,fetchSingleProducts,updateProductInfo} = require("../controller/productController")
const{fetchAllProductsBySearch} = require("../controller/sortController")


router.get("/fetchAllProducts",fetchAllProducts)

router.get("/fetchSingleProducts/:productId",fetchSingleProducts)
router.route("/creatProduct/new").post(creatProduct)
router.route("/updateProducts").put(updateProductInfo)

router.route("/fetchAllProducts/filter/search").get(fetchAllProductsBySearch)

// router.route("/fetchAllProducts/filter/offerPercent").get(filterPercentageOff)
// router.route("/fetchAllProducts/filter/price").get(filterPrice)
// router.route("/fetchAllProducts/filter/price").get(filterPrice)


// router.get("/fetchProducts/byCategory/:categoryId",fetchAllProductsByCategory)

module.exports = router