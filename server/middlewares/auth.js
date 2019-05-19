const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { verifyAccessToken } = require('../helpers/token');

const userAuthentication = (req, res, next) => {

  try {
    if(!req. headers.authorization) {
      throw new Error('Unauthorized');
    }
    const decode = verifyAccessToken(req.headers.authorization, process.env.JWT_SECRET);

    User.findById(decode.id)
    .then((user) => {
      if(user) {
        req.authenticated = decode;
        next();
        } else {
          throw new Error('User not found');
        };
      })
      .catch((error) => {
        next(error);
      });
  }
  
  catch(error) {
    next(error);
  };
};

const productAuthorization = (req, res, next) => {
  const { id } = req.params;

  Product.findById(id)
    .then((product) => {
      if(!product) {
        throw new Error('Product not found');
      } else if(product && product.sellerId == req.authenticated.id) {
        next()
      } else {
        throw new Error('Unauthorized');
      } 
    })
    .catch((error) => {
      next(error);
    });
};

const cartAuthorization = (req, res, next) => {
  const { id } = req.params;

  Cart.findById(id)
    .then((cart) => {
      if(!cart) {
        throw new Error('Cart not found');
      } else if(cart && cart.buyerId == req.authenticated.id) {
        next()
      } else {
        throw new Error('Unauthorized');
      } 
    })
    .catch((error) => {
      next(error);
    });
}; 

module.exports = {
  userAuthentication,
  productAuthorization,
  cartAuthorization,
};
