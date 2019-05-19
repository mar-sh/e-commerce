const express = require('express');

const controller = require('../controllers/cart');
const authMiddleware = require('../middlewares/auth');

const {
  userAuthentication,
  cartAuthorization,
} = authMiddleware;

const {
  postCreateCart,
  getAllCarts,
  getCartById,
  deleteAllCarts,
  deleteCartById,
} = controller;

const router = express.Router();

router.post('/', userAuthentication, postCreateCart);
router.get('/', userAuthentication, getAllCarts);
router.get('/:id', userAuthentication, cartAuthorization, getCartById);
router.delete('/', userAuthentication, deleteAllCarts);
router.delete('/:id', userAuthentication, cartAuthorization, deleteCartById);

module.exports = router;