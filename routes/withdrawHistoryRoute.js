const { Router } = require("express");
const {
  getWithdrawHistory,
  getUserWithdrawHistory,
  createWithdraw,
  updateWithdraw,
} = require("../controllers/withdrawHistoryController");

const router = Router();

router.get("/", getWithdrawHistory);
router.get("/:id", getUserWithdrawHistory);
router.post("/create", createWithdraw);
router.put("/update/:id", updateWithdraw);

module.exports = router;
