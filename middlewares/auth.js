const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken");

// (Middleware function) function to authanticate exat user
exports.isUserAuthanticated = async (req, res, next) => {
  console.log("auth run");
  try {
    const { token } = req.params;
    console.log(token);
    if (!token) {
      res.status(400).json({
        success: false,
        message: `Login first`,
      });
    }
    const tokenIdDecoded = jwt.verify(token, process.env.JWT_secret_key);
    var user = await authModel.findOne({ userId: tokenIdDecoded }).select('-password').exec();
    if (!user) {
      res.status(400).json({
        success: false,
        message: `No such user found token is tempered`,
      });
    }
    console.log(user);
    req.user = user
    next();
  } catch (ex) {
    console.log(ex);
    res.status(400).json({
      success: false,
      message: `Some error occured during authantication`,
      ex,
    });
  }
};
