const productModel = require("../models/productModel");

// crowsel product top five
exports.topCrowselFiveProducts = async (req, res, next) => {
  const products = await productModel.find().populate("category").populate("brand").limit(3);
  res.status(200).json({
    success: true,
    message: `List of top 5 products `,
    products,
  });
};

// search product by name brand and price and discription
exports.fetchAllProductsBySearch = async (req, res, next) => {
  try {
    const { input } = req.query;
    console.log(req.query);

    var r = /\d+/;
    let intvalue = input.match(r);
    let products;
    console.log(intvalue);

    if (intvalue == null || intvalue == NaN) {
      console.log("it is a string");
      products = await productModel.find({
        $or: [
          { title: { $regex: input, $options: "i" } },
          { discription: { $regex: input, $options: "i" } },
        ],
      }).populate("category").populate("brand");
    } else {
      console.log("it is a int");
      products = await productModel.find({
        $or: [{ price: { $regex: intvalue, $options: "i" } }],
      }).populate("category").populate("brand");
    }
    console.log(products);
    res.status(200).json({
      success: true,
      message: `search product`,
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

// fetch all product according to category
exports.fetchAllProductsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const products = await productModel
      .find({ category: categoryId })
      .populate("category").populate("brand");;
    // const productsByCategoryLimit = await productModel.find({ category: categoryId }).populate("category").limit(limit);
    if (!products) {
      res.status(400).json({
        success: false,
        message: `No such products with this category found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `List of all category products`,
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

// fetch all product according to brand
exports.fetchAllProductsByBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const products = await productModel
      .find({ brand: brandId })
      .populate("category").populate("brand");
    // const productsByCategoryLimit = await productModel.find({ category: categoryId }).populate("category").limit(limit);
    if (!products) {
      res.status(400).json({
        success: false,
        message: `No such products with this brand found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `List of all brand products`,
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

// top  product with higest ratings rating
exports.productsWithHigestRating = async (req, res, next) => {
  const products = await productModel.find({ rating: { $gte: 4 } }).populate("category").populate("brand");;
  res.status(200).json({
    success: true,
    message: `List of top products with highest rating products`,
    products,
  });
};

// higest liked products
exports.topLikedProducts = async (req, res, next) => {
  const products = await productModel.find().sort({ __v: -1 }).populate("category").populate("brand");;
  res.status(200).json({
    success: true,
    message: `List of all products`,
    products,
  });
};
