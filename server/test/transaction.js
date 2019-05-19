const chai = require('chai');
const chaiHttp = require('chai-http');
const { ObjectId } = require('mongoose').Types

chai.use(chaiHttp);

const expect = chai.expect;
const app = require('../server');
const testHelper = require('../helpers/test');

const {
  createTestUsers,
  createTestProducts,
  createTestCart,
  dropAll,
} = testHelper;

let token1 = '',
    token2 = '',
    user1 = '',
    user2 = '',
    testProduct1 = '',
    testProduct2 = '',
    testCart1 = '',
    cartToDelete = '';

describe('Checkout/Transactions', function() {

  

}); 