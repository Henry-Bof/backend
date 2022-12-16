const Sequelize = require("sequelize");
const User = require("../models/UserModel");
const db = require("../config/db");

const Order = db.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  createdAt: {
    type: Sequelize.BIGINT,
  },
  closedAt: {
    type: Sequelize.BIGINT,
  },
  openPrice: {
    type: Sequelize.STRING,
  },
  closedPrice: {
    type: Sequelize.STRING,
  },
  stopLoss: {
    type: Sequelize.STRING,
  },
  takeProfit: {
    type: Sequelize.STRING,
  },
  assetType: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.STRING,
  },
  leverage: {
    type: Sequelize.BIGINT,
  },
  type: {
    type: Sequelize.STRING,
  },
  profit: {
    type: Sequelize.STRING,
  },
  buyOrSell: {
    type: Sequelize.STRING,
  },
  investmentAmount: {
    type: Sequelize.STRING,
  },
});

User.hasMany(Order);
Order.belongsTo(User);

module.exports = Order;
