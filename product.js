const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  category: { type: String, required: true },
  price:    { type: Number, required: true },
  stock:    { type: Number, required: true },
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // ✅ links to user
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);