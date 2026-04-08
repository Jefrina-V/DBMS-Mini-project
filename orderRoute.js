const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  deleteAllOrders
} = require("../controller/orderController");

router.post("/", createOrder);
router.get("/", getOrders);
router.put("/:id", updateOrder);
router.delete("/all", deleteAllOrders);
router.delete("/:id", deleteOrder);

module.exports = router;