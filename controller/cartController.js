const cartModel = require("../models/cartModel");
const catogaryModel = require("../models/catogaryModel");

exports.addToCart = async (req, res, next) => {
  try {
    const { userId, product, quantity, color, size } = req.body;
    const foundCart = await cartModel.findOne({ user: userId });
    // cart does not exhist
   
    if (!foundCart) {
      const newCart = await cartModel({user:userId});

      ////
      newCart.user = userId
      newCart.items.push(
        {
        product: product,
        quantity: quantity,
        color: color,
        size: size,
      });
      await newCart.save();

      return res.status(200).json({
        success: true,
        message: `New product added to cart (F)`,
        newCart,
      });
    }

    // update if product already exhist in cart
     const updatedProduct = await cartModel.findOneAndUpdate(
      { user: userId, 'items.product' :product },
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
    newCart = await cartModel.findOneAndUpdate(
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
      newCart,
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
    const { userId, cartId} = req.body;
    const removeCart = await cartModel.findOneAndUpdate(
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
      removeCart,
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
    const userCartList = await cartModel.findOne({user:userId}).populate("items.product");
    if (!userCartList) {
      return res.status(400).json({
        success: false,
        message: `User cart is empty`,
      });
    }
    console.log(userCartList);
    res.status(200).json({
      success: true,
      message: `User cart list`,
      userCartList : userCartList.items,
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
