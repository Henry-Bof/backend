const Order = require("../models/OrderModel");
const User = require("../models/UserModel");

const Binance = require("binance-api-node").default;

const client = Binance();

const getBidAndAskPrices = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    console.log(order, "================================>");
    const user = await User.findByPk(order.userId);
    await client.ws.ticker(order.assetType, (ticker) => {
      let data = res.write(JSON.stringify(ticker));
      const percentProfitOrLoss =
        (+ticker.bestAsk / +order.openPrice.replace(",", "") - 1) *
        100 *
        order.leverage;
      const investmentAmountAfterPercentage =
        +order.investmentAmount +
        +order.investmentAmount * (percentProfitOrLoss / 100);

      if (!order.closedAt) {
        if (!!order.buyOrSell && order.buyOrSell.includes("buy")) {
          let profit = (
            +ticker.bestAsk - +order.openPrice.replace(",", "")
          ).toFixed(0);
          if (!order.stopLoss || !order.takeProfit) {
            return;
          } else if (Number(-order.stopLoss) >= Number(profit)) {
            order
              .update({
                closedAt: +new Date(),
                profit: Number(-order.stopLoss),
                closedPrice: (
                  Number(order.openPrice) + Number(-order.stopLoss)
                ).toString(),
              })
              .then((res) => console.log(res))
              .catch((e) => console.log(e));

            user
              .update({
                ballance: (
                  Number(user.ballance) +
                  Number(order.investmentAmount) +
                  Number(order.profit)
                )
                  .toFixed(0)
                  .toString(),
              })
              .then((res) => console.log(res))
              .catch((e) => console.log(e));
          } else if (Number(order.takeProfit) <= Number(profit)) {
            order
              .update({
                closedAt: +new Date(),
                profit: Number(order.takeProfit),
                closedPrice: (
                  Number(order.openPrice) + Number(order.takeProfit)
                ).toString(),
              })
              .then((res) => console.log(res))
              .catch((e) => console.log(e));

            user
              .update({
                ballance: (
                  Number(user.ballance) +
                  Number(order.investmentAmount) +
                  Number(order.profit)
                )
                  .toFixed(0)
                  .toString(),
              })
              .then((res) => console.log(res))
              .catch((e) => console.log(e));
          }
        } else {
          let profit = (
            +order.openPrice.replace(",", "") - +ticker.bestAsk
          ).toFixed(0);
          if (!order.stopLoss || !order.takeProfit) {
            return;
          } else if (Number(-order.stopLoss) <= Number(profit)) {
            console.log("inside else if");
            order
              .update({
                closedAt: +new Date(),
                profit: Number(-order.stopLoss),
                closedPrice: (
                  Number(order.openPrice) + Number(order.stopLoss)
                ).toString(),
              })
              .then((res) => console.log(res))
              .catch((e) => console.log(e));

            user
              .update({
                ballance: (
                  Number(user.ballance) +
                  Number(order.investmentAmount) +
                  Number(order.profit)
                )
                  .toFixed(0)
                  .toString(),
              })
              .then((res) => console.log(res))
              .catch((e) => console.log(e));
          } else if (Number(order.takeProfit) >= Number(profit)) {
            console.log("inside elfeif take profit");
            order
              .update({
                closedAt: +new Date(),
                profit: Number(order.takeProfit),
                closedPrice: (
                  Number(order.openPrice) + Number(-order.takeProfit)
                ).toString(),
              })
              .then((res) => console.log(res))
              .catch((e) => console.log(e));

            user
              .update({
                ballance: (
                  Number(user.ballance) +
                  Number(order.investmentAmount) +
                  Number(order.profit)
                )
                  .toFixed(0)
                  .toString(),
              })
              .then((res) => console.log(res))
              .catch((e) => console.log(e));
          }
        }
      } else {
        return;
      }
      return data;
    });
  } catch (error) {
    res.status(500).json('Could not start the websocket!')
  }
};

module.exports = {
  getBidAndAskPrices,
};
