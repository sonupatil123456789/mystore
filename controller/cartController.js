const cartModel = require("../models/cartModel");
const catogaryModel = require("../models/catogaryModel");

exports.addToCart = async (req, res, next) => {
  try {
    const { userId, product, quantity, color, size } = req.body;
    const foundCart = await cartModel.findOne({ user: userId });
    // cart does not exhist

    const userCart= [];

    if (!foundCart) {
       userCart = await cartModel({ user: userId });

      ////
      userCart.user = userId;
      userCart.items.push({
        product: product,
        quantity: quantity,
        color: color,
        size: size,
      });
      await userCart.save();

      return res.status(200).json({
        success: true,
        message: `New product added to cart (F)`,
        userCart,
      });
    }

    // update if product already exhist in cart
    var updatedProduct = await cartModel.findOneAndUpdate(
      { user: userId, "items.product": product },
      {
        $pull: {
          items: {
            product: product,
          },
        },
      },
      { new: true }
    );

    // if cart already exhist
    userCart = await cartModel.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          items: {
            product: product,
            quantity: quantity,
            color: color,
            size: size,
          },
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: `New product added to created (U)`,
      userCart,
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

exports.removeFromCart = async (req, res, next) => {
  try {
    const { userId, cartId } = req.body;
    const userCart = await cartModel.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          items: {
            _id: cartId,
          },
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: `Product removed from cart (R)`,
      userCart,
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

// fetch all products from user cart
exports.fetchUserCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(`=============================${userId}`)
    const userCart = await cartModel
      .findOne({ user: userId })
      .populate("items.product");
    if (!userCart) {
      return res.status(400).json({
        success: false,
        message: `User cart is empty`,
      });
    }
    console.log(userCart);
    res.status(200).json({
      success: true,
      message: `User cart list`,
      userCart: userCart.items,
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
