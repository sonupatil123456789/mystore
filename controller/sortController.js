const productModel = require("../models/productModel");
const limit = 5;

// filters the product according to percentage Eg 20 % off
exports.filterPercentageOff = async (req, res, next) => {
  const { offerPercent } = req.query;
  const filterProduct = await productModel.find({});
  const offerList = [];
  filterProduct.map((item, index, arr) => {
    console.log(filterProduct);
    if ((item.discountPercentage / item.price) * 100 == +offerPercent) {
      offerList.push(item);
    }
  });
  res.status(200).json({
    success: true,
    message: `List of filtered percentage`,
    offerList,
  });
};

// filter the products according to price eg 30000
exports.filterPrice = async (req, res, next) => {
  let filterProduct = [];
  if (Object.keys(req.query)[0] == "greater") {
    console.log("greater than ");
    const { greater } = req.query;
    filterProduct = await productModel.find({ price: { $gte: greater } });
  } else {
    console.log("less than ");
    const { smaller } = req.query;
    filterProduct = await productModel.find({ price: { $lte: smaller } });
  }

  res.status(200).json({
    success: true,
    message: `List of filtered percentage`,
    filterProduct,
  });
};

// filter product according to  color
exports.filterColor = async (req, res, next) => {
  const { color } = req.query;
  const filterProduct = await productModel.find({ color: color });
  res.status(200).json({
    success: true,
    message: `List of filtered percentage`,
    filterProduct,
  });
};

// filter product according to  color
exports.filterBrand = async (req, res, next) => {
  const { color } = req.query;
  const filterProduct = await productModel.find({ brand: brand });
  res.status(200).json({
    success: true,
    message: `List of filtered percentage`,
    filterProduct,
  });
};

// filter product according to  color
exports.filterPriceRange = async (req, res, next) => {
  const { rangeOne, range2 } = req.query;
  const filterProduct = await productModel.find({ brand: brand });
  res.status(200).json({
    success: true,
    message: `List of filtered percentage`,
    filterProduct,
  });
};

/////////////////////////////////////////////////////////////////////////////////////////////

/// sort by title assending or dessending
exports.sortByName = async (req, res, next) => {
  const { title } = req.query;
  try {
    var sortproduct;
    sortproduct = await productModel.find().sort({ title: title });
    console.log(sortproduct);
    res.status(200).json({
      success: true,
      message: `List of all category products`,
      sortproduct,
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

// sort by assending and desinding order
exports.sortAssendingDesending = async (req, res, next) => {
  sortproduct = await productModel.find().sort({ title: req.params.sortBy });
  res.status(200).json({
    success: true,
    message: `List of all products`,
    filterProduct,
  });
};

////////////////////////////////////////////////////////////////////////////////////////

// crowsel product top five
exports.topFiveProducts = async (req, res, next) => {
  const filterProduct = await productModel.find().limit(limit);
  res.status(200).json({
    success: true,
    message: `List of top 5 products `,
    filterProduct,
  });
};


// fetch all product according to category
exports.fetchAllProductsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const productsByCategory = await productModel.find({ category: categoryId }).populate("category");
    const productsByCategoryLimit = await productModel.find({ category: categoryId }).populate("category").limit(limit);
    if (!productsByCategory) {
      res.status(400).json({
        success: false,
        message: `No such products with this category found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `List of all category products`,
      productsByCategory,
      productsByCategoryLimit
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

// top five product with higest ratings rating
exports.topFiveProductsWithHigestRating = async (req, res, next) => {
  const filterProduct = await productModel
    .find({ rating: { $gte: 4 } })
    .limit(limit);
  res.status(200).json({
    success: true,
    message: `List of top 5 products with highest rating products`,
    filterProduct,
  });
};

///////////////////////////////////////////////////////////////////////////

exports.topLikedProducts = async (req, res, next) => {
  const filterProduct = await productModel.find().sort({ __v: 1 });
  res.status(200).json({
    success: true,
    message: `List of all products`,
    filterProduct,
  });
};

////////////////////////////////////////////////////////////////////////////

// search bar sorting
exports.fetchAllProductsBySearch = async (req, res, next) => {
  try {
    const { input } = req.query;
    console.log(req.query);

    var r = /\d+/;
    let intvalue = input.match(r);
    var sortproduct;

    if (intvalue == null || intvalue == NaN) {
      console.log("it is a string");
      sortproduct = await productModel.find({
        $or: [
          { title: { $regex: "^" + input, $options: "i" } },
          { brand: { $regex: "^" + input, $options: "i" } },
        ],
      });
    } else {
      console.log("it is a int");
      sortproduct = await productModel.find({
        $or: [{ price: intvalue }],
      });
    }
    console.log(sortproduct);
    res.status(200).json({
      success: true,
      message: `List of all category products`,
      sortproduct,
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
