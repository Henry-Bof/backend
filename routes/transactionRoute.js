const { Router } = require("express");
const {
  createTransaction,
  getTransactions,
  getUserTransactions,
  updateTransaction,
  getTransactionsAffiliate,
} = require("../controllers/transactionController");

const router = Router();

router.get("/", getTransactions);
router.get("/affiliate", getTransactionsAffiliate);
router.get("/:id", getUserTransactions);
router.post("/create", createTransaction);
router.put("/update/:id", updateTransaction);
module.exports = router;
