const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      name:     { type: String,  required: true },
      quantity: { type: Number,  required: true },
      price:    { type: Number,  required: true }
    }
  ],
  category:    { type: String,  default: "" },
  totalAmount: { type: Number,  required: true },
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // ✅ links to user
  createdAt:   { type: Date,    default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);