const { Router } = require("express");
const {
  getBidAndAskPrices,
} = require("../controllers/cryptoCurrenciesWebsocket");

const router = Router();

router.get("/:id", getBidAndAskPrices);

module.exports = router;
