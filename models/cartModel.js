const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  user: {  type: mongoose.Schema.Types.ObjectId, ref: "userAuthScheema", required: true },
  items: {
    type: [
      {
        product: {  type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: { type: Number, default: 1 },
        color: { type: String, },
        size: { type: String, },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Cart", cartSchema);
