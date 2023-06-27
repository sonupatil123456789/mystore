const express = require("express")
const router = express.Router()
const{createOrder,fetchAllOrder} = require("../controller/orderController")

router.post("/myOrder/create",createOrder)
router.route("/fetchUserOrder/allOrder/:Id").get(fetchAllOrder)


module.exports = router