const Order   = require("../models/order");
const Product = require("../models/product");
const User    = require("../models/user");

// ✅ Create order — saves to orders + products + links to user (same userId)
exports.createOrder = async (req, res) => {
  try {
    const { products, category, totalAmount, userId } = req.body;
    const item = products[0];

    // 1. ✅ Save to products collection with same userId
    const newProduct = new Product({
      name:     item.name,
      category: category,
      price:    item.price,
      stock:    item.quantity,
      userId:   userId || null    // ✅ same user ID
    });
    await newProduct.save();

    // 2. ✅ Save to orders collection with same userId
    const order = new Order({
      products:    products,
      category:    category,
      totalAmount: totalAmount,
      userId:      userId || null  // ✅ same user ID
    });
    await order.save();

    // 3. ✅ Link order ID to user's orders array in users collection
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $push: { orders: order._id }
      });
    }

    res.json({ success: true, order });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order by ID
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete single order
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete ALL orders
exports.deleteAllOrders = async (req, res) => {
  try {
    await Order.deleteMany({});
    res.json({ message: "All orders cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};