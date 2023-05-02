const express = require("express")
const {isUserAuthanticated} = require("../middlewares/auth");
const { loginUser,registerUser,myData } = require("../controller/authController");
const router = express.Router();
const upload = require("../middlewares/multerFileUploader")


router.route("/login").post(loginUser)
router.route("/regiester/new").post(upload.single("images"),registerUser)
router.get("/mydata/:token" ,isUserAuthanticated,myData)

module.exports = router