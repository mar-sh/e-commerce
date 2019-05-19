const express = require('express');

const entryRoute = require('./entry');
const productRoute = require('./product');
const cartRoute = require('./cart');
const rajaOngkirRoute = require('./api');
const transactionRoute = require('./transaction');

const { errorhandler } = require('../middlewares/errorhandler');

const router = express.Router();

router.use('/', entryRoute);
router.use('/products', productRoute);
router.use('/carts', cartRoute);
router.use('/transactions', transactionRoute);
router.use('/deliveries', rajaOngkirRoute);

router.use(errorhandler);

module.exports = router;
