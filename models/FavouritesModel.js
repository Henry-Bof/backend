const Sequelize = require("sequelize");
const User = require("./UserModel");
const db = require("../config/db");

const Favourites = db.define("favourites", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  symbol: {
    type: Sequelize.STRING,
  },
});

const Fav = db.define("userFavourites", {});

User.belongsToMany(Favourites, { through: Fav });
Favourites.belongsToMany(User, { through: Fav });

module.exports = Favourites;
