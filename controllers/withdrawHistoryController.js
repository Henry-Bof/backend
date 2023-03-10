const WithdrawHistory = require("../models/WithdrawHistoryModel");

const getWithdrawHistory = async (req, res) => {
  try {
    const withdraw = await WithdrawHistory.findAll();
    res.json(withdraw);
  } catch (error) {
    return res.status(500).json('Could not get withdraw history!');
  }
};

const getUserWithdrawHistory = async (req, res) => {
  try {
    const withdraw = await WithdrawHistory.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.json(withdraw);
  } catch (error) {
    return res.status(500).json('Could not get withdraw the history of this user!');
  }
};

const createWithdraw = async (req, res) => {
  try {
    const withdraw = await WithdrawHistory.create({
      createdAt: req.body.createdAt,
      description: req.body.description,
      amount: req.body.amount,
      beforeWithdraw: req.body.beforeWithdraw,
      afterWithdraw: req.body.afterWithdraw,
      userId: req.body.userId,
      status: req.body.status
    });

    return res.status(200).json({
      success: "Withdraw" + withdraw + "was created successfully!",
    });
  } catch (error) {
    return res.status(500).json('Could not place withdraw!');
  }
};

const updateWithdraw = async (req, res) => {
  const id = req.params.id;

  try {
    const withdraw = await WithdrawHistory.findByPk(id);
    const updatedWithdraw = await withdraw.update({
      createdAt: req.body.createdAt,
      description: req.body.description,
      amount: req.body.amount,
      beforeWithdraw: req.body.beforeWithdraw,
      afterWithdraw: req.body.afterWithdraw,
      status: req.body.status
    });

    return res.status(200).json({
      success: `Withdraw with number:${updatedWithdraw.id} was updated successfully!`,
    });
  } catch (e) {
    return res.status(500).json('Error updating the withdraw!');
  }
};

module.exports = {
  getWithdrawHistory,
  getUserWithdrawHistory,
  createWithdraw,
  updateWithdraw,
};
