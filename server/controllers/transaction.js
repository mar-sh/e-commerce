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

  static getAllTransactions(req, res, next) {
    
    Transaction.find({})
    .populate({
      path: 'cartId',
      select: ['productId'],
      populate: {
        path: 'productId',
        select: ['name'],
      },
    })
      .then((transactions) => {
        res.status(200).json(transactions);
      })
      .catch((error) => {
        next(error);
      });
  };

  static getUserTranscations(req, res, next) {
    const userId = req.authenticated.id;

    Transaction.find({ userId })
    .populate({
      path: 'cartId',
      select: ['productId'],
      populate: {
        path: 'productId',
        select: ['name'],
      },
    })
      .then((transactions) => {
        res.status(200).json(transactions);
      })
      .catch((error) => {
        next(error);
      });
  };

  static patchEditTransactionStatus(req, res, next) {
    const { id } = req.params;

    const {
      status,
      confirmed,
    } = req.body;

    const update = {
      status,
      confirmed,
    };

    for(let key in update) {
      if(!update[key]) {
        delete update[key];
      };
    };

    Transaction.findOneAndUpdate({ _id: id }, update, { new: true, runValidators: true })
      .then((transaction) => {
        res.status(200).json(transaction);
      })
      .catch((error) => {
        next(error);
      });
  };

};

module.exports = TransactionController;