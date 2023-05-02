const express = require("express")
const { creatCategory,fetchAllCategorys,fetchSingleCategorys} = require("../controller/categoryController");
const router = express.Router();



router.route("/createCategorys/new").post(creatCategory)
router.get("/getAllCategorys",fetchAllCategorys)
router.get("/getCategorys/:id",fetchSingleCategorys)

module.exports = router