const express = require('express');

const controller = require('../controllers/api');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

const { userAuthentication } = authMiddleware;

const {
  getListOfProvinces,
  getListOfCities,
  postRequestDeliveryCost,
} = controller;

// router.use(userAuthentication);

router.get('/province', getListOfProvinces);
router.get('/city', getListOfCities);
router.post('/cost', postRequestDeliveryCost);

module.exports = router;
