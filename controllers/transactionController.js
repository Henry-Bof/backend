const User = require("../models/UserModel");
const Affiliate = require("../models/AffiliateModel");
const Transaction = require("../models/TransactionsModel");
const { Op } = require("sequelize");

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    return res.status(500).json('Could not get all transactions!');
  }
};

const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.json(transactions);
  } catch (error) {
    return res.status(500).json('Could not get this user transactions!');
  }
};

const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      createdAt: req.body.createdAt,
      description: req.body.description,
      amount: req.body.amount,
      beforeTransaction: req.body.beforeTransaction,
      afterTransaction: req.body.afterTransaction,
      userId: req.body.userId,
    });

    return res.status(200).json({
      success: "Transaction" + transaction + "was created successfully!",
    });
  } catch (error) {
    return res.status(500).json('Error creating a transaction!');
  }
};

const updateTransaction = async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await Transaction.findByPk(id);
    const updatedTransaction = await transaction.update({
      createdAt: req.body.createdAt,
      description: req.body.description,
      amount: req.body.amount,
      beforeTransaction: req.body.beforeTransaction,
      afterTransaction: req.body.afterTransaction,
    });

    return res.status(200).json({
      success: `Transaction with number:${updatedTransaction.id} was updated successfully!`,
    });
  } catch (e) {
    return res.status(500).json('Error updating the transaction!');
  }
};

const getTransactionsAffiliate = async (req, res) => {
  try {
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const orderBy = req.query.orderBy;

    const filters = {};
    const filterOrderBy = [];
    
    if (orderBy) {
      filterOrderBy.push(orderBy);
    }

    if (fromDate && toDate)
      filters.createdAt = {
        [Op.between]: [fromDate, toDate],
      };

    const affiliate = await Affiliate.findOne({
      where: {
        secret: req.headers.secret,
      },
    });

    const transactions = await Transaction.findAll({
      where: filters,
      order: filterOrderBy,
      raw: true,
      attributes: { exclude: ["userId", "description"] },
      include: {
        model: User,
        attributes: { exclude: ["password", "role", "affiliateId"] },
        where: {
          affiliateId: affiliate.id,
        },
      },
    });

    const modifiedTransactions = transactions.map(transaction => Number(transaction.amount) >= 250 ? {...transaction, amount: "250"} : transaction);

    res.json({ succes: true, data: modifiedTransactions });
  } catch (error) {
    return res.status(500).json('Could not get affilite transactions!');
  }
};

module.exports = {
  getTransactions,
  getUserTransactions,
  createTransaction,
  updateTransaction,
  getTransactionsAffiliate,
};
