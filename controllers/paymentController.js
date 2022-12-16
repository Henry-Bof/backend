const axios = require("axios");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
 
async function authenticationRequest(req, res) {
  const orderId = uuidv4();
  const orderCurrency = "eur";
  const merchantPass = "3948ff1b79243a9cbe1c753bb8037d5f";
  const merchantKey = "aa6fc786-6971-11ed-ae7e-aa7cb2200736";
  const checkoutUrl = "https://checkout.rafinita.com/api/v1/session";
  const orderDescription = "Deposit Money";
 
  const amount = req.body.amount;
  const userEmail = req.body.userEmail;
  const userFirstName = req.body.userFirstName;
  const userLastName = req.body.userLastName;
  const userCity = req.body.userCity;
  const userAddress = req.body.userAddress;
  const userPostCode = req.body.userPostCode;
  const userPhone = req.body.userPhone;
 
  const depositValue = Number(amount).toFixed(2);
 
  const to_md5 =
    orderId + depositValue + orderCurrency + orderDescription + merchantPass;
  const hash = CryptoJS.SHA1(CryptoJS.MD5(to_md5.toUpperCase()).toString());
  const sessionHash = CryptoJS.enc.Hex.stringify(hash);
 
  const data = {
    merchant_key: merchantKey,
    operation: "purchase",
    methods: ["card"],
    order: {
      number: orderId,
      amount: depositValue,
      currency: "EUR",
      description: orderDescription,
    },
    cancel_url: "https://bullchain-traders.com/canceled-deposit",
    success_url: "https://bullchain-traders.com/successful-deposit",
    customer: {
      name: `${userFirstName} ${userLastName}`,
      email: userEmail,
    },
    billing_address: {
      city: userCity,
      address: userAddress,
      zip: userPostCode,
      phone: userPhone,
    },
    recurring_init: "true",
    hash: sessionHash,
  };
 
  const response = await axios.post(checkoutUrl, data);
  res.json(response.data);
}
 
module.exports = {
  authenticationRequest,
};