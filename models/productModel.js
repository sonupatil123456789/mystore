const mongoose = require("mongoose");
const { schema } = require("./authModel");
const productScheema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter product name"],
  },
  discription: {
    type: String,
    required: [true, "Please enter product discription"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [8, "Number could not exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  discountPercentage: {
    type: Number,
    default: 0.0,
  },
  productImages: [
  ],
  thumbnail: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    // type: schema.type.objectId,
    ref: "Category",
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [4, " Stock cannot exceed 4 char "],
  },
  color: [],
  size:[],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Products", productScheema);
