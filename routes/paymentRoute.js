const { Router } = require("express");
const { authenticationRequest } = require("../controllers/paymentController");
 
const router = Router();
 
router.post("/", authenticationRequest);
 
module.exports = router;