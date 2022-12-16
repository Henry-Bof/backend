const db = require("../config/db");
const Sequelize = require("sequelize");
const User = require("../models/UserModel");

const Affiliate = db.define("affiliate", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  secret: {
    type: Sequelize.STRING,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
});

Affiliate.hasMany(User);
User.belongsTo(Affiliate);
module.exports = Affiliate;
