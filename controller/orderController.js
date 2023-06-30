const orderModel = require("../models/orderModel");


exports.createOrder = async (req, res, next) => {
  try {
    const { user , items } = req.body;
    const Order = await orderModel({
        user,items
    })
    await Order.save()

    return res.status(200).json({
      success: true,
      message: `New order created`,
      Order,
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

exports.fetchAllOrder = async (req, res, next) => {
  try {
    const { Id } = req.params;
    console.log('Id :>> ', Id);
    const items = await orderModel.find({
        "user._id":Id
    })
    console.log('items :>> ', items);
    return res.status(200).json({
      success: true,
      message: `Fetching all user order`,
      Order : {
        allitems:items
      },
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


