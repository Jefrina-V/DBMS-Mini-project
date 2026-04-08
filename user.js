const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:  { type: String, required: true, unique: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  orders:    [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // ✅ links to orders
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);