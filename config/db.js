const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

module.exports = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    port: 5432,
    // port: 5000,
    host: process.env.DB_HOST,
    //uncomment when deploying to gcloud
    //host: "/cloudsql/" + process.env.DB_INSTANCE_NAME,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    define: {
      timestamps: false,
      underscored: false,
    },
    logging: false,
  }
);
