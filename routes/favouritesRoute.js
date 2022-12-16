const { Router } = require("express");
const {
  getFavourites,
  updateFavourites,
} = require("../controllers/favouritesController");

const router = Router();

router.get("/", getFavourites);
router.put("/", updateFavourites);

module.exports = router;
