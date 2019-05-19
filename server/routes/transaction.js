const express = require('express');

const controller = require('../controllers/transaction');
const authMiddleware = require('../middlewares/auth');

const {
  userAuthentication,
  adminAuthorization,
} = authMiddleware;

const {
  postCreateTransaction,
  getAllTransactions,
  getUserTranscations,
  patchEditTransactionStatus,
} = controller;

const router = express.Router();

router.post('/', userAuthentication, postCreateTransaction);
router.get('/admin', userAuthentication, adminAuthorization, getAllTransactions);
router.get('/', userAuthentication, getUserTranscations);
router.patch('/:id', userAuthentication, patchEditTransactionStatus);

module.exports = router;
