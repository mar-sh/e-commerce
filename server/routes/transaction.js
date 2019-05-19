const express = require('express');

const controller = require('../controllers/transaction');
const authMiddleware = require('../middlewares/auth');

const {
  userAuthentication,
} = authMiddleware;

const {
  postCreateTransaction,
} = controller;

const router = express.Router();

router.post('/', userAuthentication, postCreateTransaction);

module.exports = router;