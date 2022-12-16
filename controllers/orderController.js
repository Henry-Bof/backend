const Order = require("../models/OrderModel");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.json(orders);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      createdAt: req.body.createdAt,
      openPrice: req.body.openPrice,
      assetType: req.body.assetType,
      quantity: req.body.quantity,
      leverage: req.body.leverage,
      stopLoss: req.body.stopLoss,
      takeProfit: req.body.takeProfit,
      type: req.body.type,
      userId: req.body.userId,
      buyOrSell: req.body.buyOrSell,
      investmentAmount: req.body.investmentAmount,
    });

    return res.status(200).json({
      success: `Order with number:${order.id} was created successfully!`,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const createSimulatedOrder = async (req, res) => {
  const userId = req.params.id;

  try {
    const order = await Order.create({
      createdAt: req.body.createdAt,
      openPrice: req.body.openPrice,
      assetType: req.body.assetType,
      quantity: req.body.quantity,
      leverage: req.body.leverage,
      stopLoss: req.body.stopLoss,
      takeProfit: req.body.takeProfit,
      type: req.body.type,
      userId: userId,
      buyOrSell: req.body.buyOrSell,
      investmentAmount: req.body.investmentAmount,
      closedAt: req.body.closedAt,
      closedPrice: req.body.closedPrice,
      profit: req.body.profit,
    });

    return res.status(200).json({
      success: `Order with number:${order.id} was created successfully!`,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.findByPk(id);
    const updatedOrder = await order.update({
      createdAt: req.body.createdAt,
      closedAt: req.body.closedAt,
      closedPrice: req.body.closedPrice,
      profit: req.body.profit,
      openPrice: req.body.openPrice,
      closedPrice: req.body.closedPrice,
      stopLoss: req.body.stopLoss,
      takeProfit: req.body.takeProfit,
      assetType: req.body.assetType,
      quantity: req.body.quantity,
      leverage: req.body.leverage,
      type: req.body.type,
      buyOrSell: req.body.buyOrSell,
      investmentAmount: req.body.investmentAmount,
    });

    return res.status(200).json({
      success: `Order with number:${updatedOrder.id} was updated successfully!`,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports = {
  getOrders,
  getUserOrders,
  createOrder,
  createSimulatedOrder,
  updateOrder,
};
