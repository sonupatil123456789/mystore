const productModel = require("../models/productModel");

// sort by assending and desinding order
exports.sortAssendingDesending = async (req, res, next) => {
  console.log(
    "req.params.assendinddessending :>> ",
    req.params.assendinddessending
  );
  let sortproduct;
  if (req.params.assendinddessending == "asc") {
    sortproduct = await productModel.find().sort({ title: 1 }).populate("category").populate("brand");
    res.status(200).json({
      success: true,
      message: `List of all ascending products`,
      sortproduct,
    });
  } else {
    sortproduct = await productModel.find().sort({ title: -1 }).populate("category").populate("brand");
    res.status(200).json({
      success: true,
      message: `List of all decending products`,
      sortproduct,
    });
  }
};


// sort by highest to lowest and lowest to hieghest price 
exports.sortHtlLth = async (req, res, next) => {
  console.log(
    "req.params.assendinddessending :>> ",
    req.params.assendinddessending
  );
  let sortproduct;
  if (req.params.sortHtlLth == "htl") {
    sortproduct = await productModel.find().sort({ price: -1 }).populate("category").populate("brand");
    res.status(200).json({
      success: true,
      message: `highest to lowest`,
      sortproduct,
    });
  } else {
    sortproduct = await productModel.find().sort({ price: 1 }).populate("category").populate("brand");
    res.status(200).json({
      success: true,
      message: `lowest to highest `,
      sortproduct,
    });
  }
};
