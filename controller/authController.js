const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

// login user function
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: `Please register first to login` });
    }
    let passwordmatch = await bcrypt.compare(password, user.password);
    if (!passwordmatch) {
      res.status(400).json({
        success: false,
        message: `Invalid password crediantials`,
      });
    } else {
      res.status(200).cookie("token", user.token, { httpOnly: true }).json({
        success: true,
        message: `User login successfully`,
        user,
      });
    }
  } catch (ex) {
    console.log(ex);
    res.status(400).json({
      success: false,
      message: `Some error occured`,
      ex,
    });
  }
};

// register user function
exports.registerUser = async (req, res, next) => {
  try {
    let { fullName, email, number, password, images, birthdate, address } =
      req.body;

    const file = req.file;

    if (file == null || file == undefined) {
      console.log("File not uploaded");
      images = "";
    } else {
      console.log(file);
      var result = await uploadToCloudinary(file.path, file.filename);

      if (result.message == "Success") {
        console.log(result.url);
        images = result.url;
      }
    }

    const userId = uuid.v4();
    const token = jwt.sign(userId, process.env.JWT_secret_key);
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);

    let user = await authModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: `User already exhisted with this emailid`,
      });
    }
    const userresponse = new authModel({
      userId: userId,
      fullName,
      email,
      number,
      password: hash_password,
      images,
      birthdate,
      address,
      token: token,
    });
    await userresponse.save();
    res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: `user created successfully`,
      userresponse,
    });
  } catch (ex) {
    console.log(ex);
    res.status(400).json({
      success: false,
      message: `Some error occured`,
      ex,
    });
  }
};

// checking is user authintacated
exports.myData = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: `My profile data`,
      user: req.user,
    });
  } catch (ex) {
    console.log(ex);
    res.status(400).json({
      success: false,
      message: `Some error occured`,
      ex,
    });
  }
};
