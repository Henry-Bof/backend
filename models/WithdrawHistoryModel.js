const Sequelize = require("sequelize");
const User = require("../models/UserModel");
const db = require("../config/db");

const WithdrawHistory = db.define("withdrawHistory", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  createdAt: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  amount: {
    type: Sequelize.STRING,
  },
  beforeWithdraw: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  afterWithdraw: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
  },
});

User.hasMany(WithdrawHistory);
WithdrawHistory.belongsTo(User);
module.exports = WithdrawHistory;
