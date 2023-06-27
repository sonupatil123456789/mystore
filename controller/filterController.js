const productModel = require("../models/productModel");
const limit = 5;

// filters the product according to percentage Eg 20 % off
exports.filterPercentageOff = async (req, res, next) => {
  try {
    const { offerPercent } = req.query;
    const filterProduct = await productModel.find({});
    const products = [];
    filterProduct.map((item, index, arr) => {
      console.log(filterProduct);
      if ((item.discountPercentage / item.price) * 100 == +offerPercent) {
        products.push(item);
      }
    });
    res.status(200).json({
      success: true,
      message: `List of filtered percentage`,
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

// filter the products according to price eg 30000
exports.filterPrice = async (req, res, next) => {
  try {
    let products = [];
    if (Object.keys(req.query)[0] == "greater") {
      console.log("greater than " +  (req.query)[0].toString() );
      const { greater } = req.query;
      products = await productModel.find({ price: { $gte: greater } });
    } else {
      console.log("less than ");
      const { smaller } = req.query;
      products = await productModel.find({ price: { $lte: smaller } });
    }

    res.status(200).json({
      success: true,
      message: `List of filtered by price `,
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

// filter product according to  color
exports.filterColor = async (req, res, next) => {
  try {
    const { color } = req.query;
    console.log('color :>> ', color , "new color value "+ `#${color}`);
    const products = await productModel.find({ color: `#${color}` });
    res.status(200).json({
      success: true,
      message: `List of filtered by color`,
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

// filter product according to  color
exports.filterPriceRange = async (req, res, next) => {
  try {
    const { smaller, greater } = req.query;
    console.log("object :>> ", req.query);
    const products = await productModel.find({
      price: { $lte:greater , $gte:  smaller},
    });
    res.status(200).json({
      success: true,
      message: `List of filtered range `,
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
