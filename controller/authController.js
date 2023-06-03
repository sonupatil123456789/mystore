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
    let { fullName, email, password } = req.body;
    console.log({ fullName, email, password });

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
    user = new authModel({
      userId: userId,
      fullName,
      email,
      password: hash_password,
      token: token,
    });
    await userresponse.save();
    res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: `User registered successfully`,
      user,
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

// update user information function
exports.updateUser = async (req, res, next) => {
  console.log(" req.params.userId :>> ", req.params.userId);
  try {
    let userresponse = await authModel.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      {
        new: true,
        useFindAndModify: true,
        runValidators: false,
      }
    );
    if (!userresponse) {
      return res.status(400).json({
        success: false,
        message: `Some error occured no such user found `,
      });
    }
    res.status(200).json({
      success: true,
      message: `User information successfully updated`,
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

// update user avatar image function
exports.updateUserAvatar = async (req, res, next) => {
  try {
    var images;
    const file = req.file;
    console.log(file);
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
    let userresponse = await authModel.findOneAndUpdate(
      { userId: req.params.userId },
      { images: images },
      {
        new: true,
        useFindAndModify: true,
        runValidators: false,
      }
    );
    if (!userresponse) {
      return res.status(400).json({
        success: false,
        message: `Some error occured no such user found `,
      });
    }
    res.status(200).json({
      success: true,
      message: `User profile avatar successfully updated`,
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
      userresponse: req.user,
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
