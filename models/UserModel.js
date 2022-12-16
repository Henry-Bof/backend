const Sequelize = require("sequelize");

const db = require("../config/db");

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  registrationDate: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  lastLogon: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  statusUpdateDate: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.BIGINT,
  },
  job: {
    type: Sequelize.STRING,
  },
  gender: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  streetAddress: {
    type: Sequelize.STRING,
  },
  postCode: {
    type: Sequelize.SMALLINT,
  },
  dayOfBirth: {
    type: Sequelize.STRING,
  },
  monthOfBirth: {
    type: Sequelize.STRING,
  },
  yearOfBirth: {
    type: Sequelize.STRING,
  },
  ballance: {
    allowNull: true,

    type: Sequelize.STRING,
  },
  equity: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  freeMargin: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  profit: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  verifiedAddress: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  verifiedFunding: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  verifiedPassport: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  status: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  role: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  offerName: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  offerUrl: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  offerDescription: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  comment: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  agent: {
    allowNull: true,
    type: Sequelize.STRING,
  },
});

module.exports = User;
