const Cart = require('../models/Cart');

class CartController {

  static postCreateCart(req, res, next) {
    const buyerId = req.authenticated.id;
    const {
      productId,
      quantity,
      amount,
      sellerId,
    } = req.body;

    const newCart = new Cart({
      productId,
      quantity,
      amount,
      buyerId,
      sellerId,
    });

    newCart.save()
      .then((cart) => {
        res.status(201).json(cart);
      })
      .catch((error) => {
        next(error);
      });
  };

  static getAllCarts(req, res, next) {
    const userId = req.authenticated.id;

    Cart.find({ buyerId: userId, status: 'pending' })
      .populate('productId')
      .then((carts) => {
        res.status(200).json(carts);
      })
      .catch((error) => {
        next(error);
      });
  };

  static getCartById(req, res, next) {
    const { id } = req.params;

    Cart.findById(id)
      .populate('productId')
      .then((cart) => {
        res.status(200).json(cart);
      })
      .catch((error) => {
        next(error);
      });
  };

  static deleteAllCarts(req, res, next) {
    const { userId } = req.authenticated.id;

    Cart.deleteMany({ buyerId: userId })
      .then(() => {
        res.status(204).json();
      })
      .catch((error) => {
        next(error);
      });
  };

  static deleteCartById(req, res, next) {
    const { id } = req.params;
    
    Cart.findByIdAndDelete(id)
      .then(() => {
        res.status(204).json()
      })
      .catch((error) => {
        next(error);
      });
  };

};

module.exports = CartController;
