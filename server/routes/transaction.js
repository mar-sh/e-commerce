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

router.use(userAuthentication);

router.post('/', postCreateTransaction);
router.get('/admin', adminAuthorization, getAllTransactions);
router.get('/', getUserTranscations);
router.patch('/:id', patchEditTransactionStatus);

module.exports = router;
