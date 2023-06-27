const express = require("express")
const { creatBrands,fetchAllBrands,fetchSingleBrand} = require("../controller/brandController");
const router = express.Router();



router.route("/creatBrands/new").post(creatBrands)
router.get("/getAllBrands",fetchAllBrands)
router.get("/getBrands/:id",fetchSingleBrand)

module.exports = router