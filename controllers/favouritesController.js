const Favourites = require("../models/FavouritesModel");
const User = require("../models/UserModel");

const getFavourites = async (req, res) => {
  try {
    const favourites = await Favourites.findAll();
    res.json(favourites);
  } catch (error) {
    return res.status(500).json('Could not get all favourites!');
  }
};

const updateFavourites = async (req, res) => {
  const user = await User.findByPk(req.body.userId, {
    include: [{ model: Favourites }],
  });
  const favorites = await Favourites.findAll({
    where: { symbol: req.body.symbol },
  });
  try {
    if (await user.hasFavourites(favorites)) {
      user.removeFavourites(favorites);
    } else {
      user.addFavourites(favorites);
    }
    res.json(user);
    return user;
  } catch (e) {
    return res.status(500).json('Could not update favourites!');
  }
};

module.exports = {
  getFavourites,
  updateFavourites,
};
