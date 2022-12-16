const Sequelize = require("sequelize");
const User = require("../models/UserModel");
const db = require("../config/db");

// TO ADD TYPE OF TRANSACTION SEQUALIZE.STRING TYPE AND CAN BE NULL BT DEFAULT
const Transaction = db.define("transaction", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  createdAt: {
    type: Sequelize.BIGINT,
  },
  description: {
    type: Sequelize.STRING,
  },
  amount: {
    type: Sequelize.STRING,
  },
  beforeTransaction: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  afterTransaction: {
    allowNull: false,
    type: Sequelize.STRING,
    },
});

User.hasMany(Transaction);
Transaction.belongsTo(User);
module.exports = Transaction;
