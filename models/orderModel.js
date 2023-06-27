const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  user: {   type: Map , required: true },
  status: { type: String, default:"Order-Placed"},
  items: {
    type: [
      {
        product: {  type: Map ,require:true },
        quantity: { type: Number, default: 1 },
        color: { type: String, },
        size: { type: String, },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Order", orderSchema);