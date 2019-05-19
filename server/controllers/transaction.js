const Transaction = require('../models/Transaction');

class TransactionController {

  static postCreateTransaction(req, res, next) {
    const userId = req.authenticated.id;

    const {
      cartId,
      userAddress,
      userContact,
      totalCharge
    } = req.body;

    const newTransaction = new Transaction({
      userId,
      cartId,
      userAddress,
      userContact,
      totalCharge,
    });

    console.log(newTransaction);

    newTransaction.save()
      .then((transaction) => {
        res.status(201).json(transaction);
      })
      .catch((error) => {
        next(error);
      });
  };

};

module.exports = TransactionController;