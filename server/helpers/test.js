const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
// const Transaction = require('../models/Transaction');

const { createAccessToken } = require('../helpers/token');

let firstUser = '',
    secondUser = '',
    thirdUser = '';

const randomEmail = () => {
  return `${Math.random().toString(36).substring(5)}@mail.com`;
};

const createTestUsers = () => {
  const testUserOne = new User({
    username: 'userOne',
    email: randomEmail(),
    password: '123',
  });

  const testUserTwo = new User({
    username: 'userTwo',
    email: randomEmail(),
    password: '123',
  });

  const testUserThree = new User({
    username: 'userThree',
    email: randomEmail(),
    password: '123',
  });

  const userOne = testUserOne.save(),
        userTwo = testUserTwo.save(),
        userThree = testUserThree.save();
  
  return new Promise((resolve, reject) => {
    Promise.all([userOne, userTwo, userThree])
    .then(([userOne, userTwo, userThree]) => {
      let tokens = [];
      let userIds = [];
      let users = [userOne, userTwo, userThree];

      users.forEach((user) => {
        tokens.push(createAccessToken({
          id: user._id,
          email: user.email,
        }));
        userIds.push(user._id);
      });
      [firstUser, secondUser, thirdUser] = [...userIds];
      resolve({tokens, userIds});
    })
  });

};

const createTestProducts = (done, sellerOne, sellerTwo) => {
  const testProductOne = new Product({
    name: 'testProductOne',
    stock: 99,
    price: 10000,
    url: 'https://somecloud.com/product1.img',
    description: 'amazing product',
    sellerId: sellerOne,
  });

  const testProductTwo = new Product ({
    name: 'testProductTwo',
    stock: 99,
    price: 10000,
    url: 'https://somecloud.com/product2.img',
    description: 'amazing product',
    sellerId: sellerTwo,
  });

  const productOne = testProductOne.save();
  const productTwo = testProductTwo.save();

  return new Promise((resolve, reject) => {
    Promise.all([productOne, productTwo])
      .then(([productOne, productTwo]) => {
        let products = {
          productOneId: productOne._id,
          productTwoId: productTwo._id,
        };
        resolve(products);
        done();
      })
      .catch((err) => {
        reject(err);
        done();
      })
  });

};

const createTestCart = (done, productId, sellerId, buyerId) => {
  const testCart = new Cart ({
    productId,
    quantity: 1,
    amount: 10000,
    sellerId,
    buyerId,
  });

  return new Promise((resolve, reject) => {
    testCart.save()
    .then((cart) => {
      resolve(cart._id);
      done();
    })
    .catch((error) => {
      reject(error);
      done();
    });
  }); 
};

const dropAll = (done) => {
  User.deleteMany({})
    .exec();
  Product.deleteMany({})
    .exec();
  Cart.deleteMany({})
    .exec();
  done();
};

const dropUsers = (done) => {
  User.deleteMany({})
    .then(() => {
      done();
    });
};

const dropProducts = (done) => {
  Product.deleteMany({})
    .then(() => {
      done();
    })
}

const dropCarts = (done) => {
  Cart.deleteMany({})
    .then(() => {
      done();
    })
}

module.exports = {
  createTestUsers,
  createTestProducts,
  createTestCart,
  dropAll,
  dropUsers,
  dropProducts,
  dropCarts,
}


