const { Router } = require("express");
const {
  createOrder,
  getOrders,
  updateOrder,
  getUserOrders,
  createSimulatedOrder,
} = require("../controllers/orderController");

const router = Router();

router.get("/", getOrders);
router.get("/:id", getUserOrders);
router.post("/create", createOrder);
router.post("/create/:id", createSimulatedOrder);
router.put("/update/:id", updateOrder);

module.exports = router;
