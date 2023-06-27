const productModel = require("../models/productModel");

exports.creatProduct = async (req, res, next) => {
  try {
    // const {  title, discription, color, size ,price, rating, stock, brand, category, thumbnail,productImages} =req.body;
    const product = await productModel.create(req.body);
    res.status(200).json({
      success: true,
      message: `New product created`,
      product,
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

exports.fetchAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.status(200).json({
      success: true,
      message: `List of all products`,
      products,
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

exports.fetchSingleProducts = async (req, res, next) => {
  try {
    const products = await productModel.findOneById({
      _id: req.params.productId,
    });
    res.status(200).json({
      success: true,
      message: `List of all products`,
      products,
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

exports.updateProductInfo = async (req, res, next) => {
  try {
    const {
      id,
      title,
      discription,
      color,
      size,
      price,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      productImages,
      discountPercentage,
    } = req.body;

    const updatedproduct = await productModel.findOneAndUpdate(
      { _id: id },
      {
        title,
        discription,
        price,
        rating,
        stock,
        brand,
        discountPercentage,
        category,
        thumbnail,
        $push: {
          color: color,
          size: size,
          productImages: productImages,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: ` Product is is updated  (U)`,
      updatedproduct,
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

exports.likeProduct = async (req, res, next) => {
  try {
    const { id, like, isLiked } = req.body;
    let products = null;
    console.log(' req.body :>> ',  req.body);
      products = await productModel.findOneAndUpdate(
        { _id: id },
        { likes: like},
        { new: true }
      );
    console.log("products :>> ", products);
    return res.status(200).json({
      success: true,
      message: `product like is updated `,
      products,
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
