const express = require("express")
const router = express.Router()
const{addToCart,removeFromCart,fetchUserCart} = require("../controller/cartController")

router.get("/fetchUserCart/:userId",fetchUserCart)
router.route("/addToCart/add").post(addToCart)
router.route("/removeFromCart").delete(removeFromCart)

module.exports = router