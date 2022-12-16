const Affiliate = require("../models/AffiliateModel");

const getAffiliates = async (req, res) => {
  try {
    const data = await Affiliate.findAll();
    res.json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const createAffiliate = async (req, res) => {
  try {
    const body = await Affiliate.create({
      secret: req.body.secret,
      name: req.body.name,
    });

    return res.status(200).json({
      success: true,
      data: body,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// const getUserTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.findAll({
//       where: {
//         userId: req.params.id,
//       },
//     });
//     res.json(transactions);
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// const updateTransaction = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const transaction = await Transaction.findByPk(id);
//     const updatedTransaction = await transaction.update({
//       createdAt: req.body.createdAt,
//       description: req.body.description,
//       amount: req.body.amount,
//       beforeTransaction: req.body.beforeTransaction,
//       afterTransaction: req.body.afterTransaction,
//     });

//     return res.status(200).json({
//       success: `Transaction with number:${updatedTransaction.id} was updated successfully!`,
//     });
//   } catch (e) {
//     return res.status(400).json({ message: e.message });
//   }
// };

module.exports = {
  getAffiliates,
  createAffiliate,
  // getUserTransactions,
  // createTransaction,
  // updateTransaction,
};
