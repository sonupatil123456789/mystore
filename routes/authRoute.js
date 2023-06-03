const express = require("express")
const {isUserAuthanticated} = require("../middlewares/auth");
const { loginUser,registerUser,updateUser,updateUserAvatar,myData } = require("../controller/authController");
const router = express.Router();
const upload = require("../middlewares/multerFileUploader")


router.route("/login").post(loginUser)
router.route("/regiester/new").post(registerUser)
router.route("/updateUser/:userId").put(updateUser)
router.route("/updateUser/images/:userId").put(upload.single("images"),updateUserAvatar)
router.get("/mydata/:token" ,isUserAuthanticated,myData)

module.exports = router