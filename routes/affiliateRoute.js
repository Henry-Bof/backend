const { Router } = require("express");
const {
  getAffiliates,
  createAffiliate,
} = require("../controllers/affiliateController");

const router = Router();

router.get("/", getAffiliates);
router.post("/", createAffiliate);

module.exports = router;
