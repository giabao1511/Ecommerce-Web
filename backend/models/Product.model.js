const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  image01: {
    type: String,
    require: true,
    trim: true,
  },
  image02: {
    type: String,
    require: true,
    trim: true,
  },
  categorySlug: {
    type: String,
    require: true,
    trim: true,
  },
  colors: {
    type: [String],
    require: true,
  },
  slug: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  size: {
    type: [String],
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = new mongoose.model("Product", ProductSchema);
