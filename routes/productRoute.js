const express = require("express")
const router = express.Router()
const{creatProduct,fetchAllProducts,fetchSingleProducts,updateProductInfo,likeProduct} = require("../controller/productController")
const{filterPercentageOff,filterPrice,filterColor,filterPriceRange} = require("../controller/filterController")
const{sortAssendingDesending,sortHtlLth} = require("../controller/sortController")
const{fetchAllProductsBySearch,fetchAllProductsByCategory,productsWithHigestRating,topLikedProducts,topCrowselFiveProducts,fetchAllProductsByBrand} = require("../controller/homescreenController")


router.get("/fetchAllProducts",fetchAllProducts)
router.put("/fetchAllProducts/like",likeProduct)
router.get("/fetchSingleProducts/:productId",fetchSingleProducts)
router.route("/creatProduct/new").post(creatProduct)
router.route("/updateProducts").put(updateProductInfo)


// homescreen
router.route("/fetchAllProducts/filter/search").get(fetchAllProductsBySearch)
router.get("/fetchProducts/topFiveBannerProducts",topCrowselFiveProducts)  
router.get("/fetchProducts/byCategory/:categoryId",fetchAllProductsByCategory)
router.get("/fetchProducts/byBrand/:brandId",fetchAllProductsByBrand)
router.get("/fetchProducts/byHiegestRating",productsWithHigestRating)
router.get("/fetchProducts/byHigestLikedProducts",topLikedProducts)  

// sortByName,sortAssendingDesending
router.route("/fetchAllProducts/sort/assendinddessending/:assendinddessending").get(sortAssendingDesending)
router.route("/fetchAllProducts/sort/sortHtlLth/:sortHtlLth").get(sortHtlLth)

// filtering products by price , color , range , discount percentage



router.route("/fetchAllProducts/filter/PercentageFilter").get(filterPercentageOff)
router.route("/fetchAllProducts/filter/priceFilter").get(filterPrice)
router.route("/fetchAllProducts/filter/colorFilter").get(filterColor)
router.route("/fetchAllProducts/filter/priceRangeFilter").get(filterPriceRange)




module.exports = router