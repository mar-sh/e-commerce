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

describe('Carts', function() {

  before(function(done) {
    createTestUsers()
      .then(function(users) {
        const {
          tokens,
          userIds,
        } = users;
  
        [token1, token2] = [...tokens];
        [user1, user2] = [...userIds];
        return createTestProducts(done, user1, user2)
      })
        .then(function(products) {
          testProduct1 = products.productOneId;
          testProduct2 = products.productTwoId;
        })
        .catch((error) => {
          console.log(error);
        }) 
  });

  after(function(done) {
    dropAll(done);
  });

  describe('POST /carts route test', function() {

    describe('POST /carts success test', function() {

      it('should return 201 status code and a cart object', function(done) {
        const testCart = {
          productId: testProduct1,
          quantity: 5,
          amount: 50000,
          sellerId: user1,
          buyerId: user2,
          status: 'pending',
        };

        chai
          .request(app)
          .post('/carts')
          .send(testCart)
          .set('Authorization', token2)
          .end(function(err, res) {
            expect(err).to.be.null;
            console.trace(res.body)
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.include.all.keys('_id', 'productId', 'quantity', 'amount', 'sellerId', 'buyerId', 'status');
            expect(res.body.status).to.be.a('string');
            expect(res.body.status).to.equal('pending');
            expect(res.body.productId.toString()).to.equal(testProduct1.toString());
            expect(res.body.sellerId.toString()).to.equal(user1.toString());
            expect(res.body.buyerId.toString()).to.equal(user2.toString());
            testCart1 = res.body._id;
            done();
          });

      });

    });

    describe('POST /carts error test', function() {

      it('should not allow any empty fields', function(done) {
        const testCart = {
          productId: '',
          quantity: '',
          sellerId: '',
          buyerId: '',
          status: 'pending',
        };

        chai
          .request(app)
          .post('/carts')
          .send(testCart)
          .set('Authorization', token1)
          .end(function(err, res) {
            expect(err).to.be.null;

            expect(res).to.have.status(409);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.match(/(product)|(seller)|(buyer)/ig);
            done();
          });
      });

      it('should not allow unauthenticated user', function(done) {
        const testCart = {
          productId: testProduct1,
          quantity: 5,
          sellerId: user1,
          buyerId: user2,
          status: 'pending',
        };
        testCart.price = testProduct1.price * testCart.quantity;

        chai
          .request(app)
          .post('/carts')
          .send(testCart)
          .end(function(err, res) {
            expect(err).to.be.null;

            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.match(/(Unauthorized)/g);
            done();
          });
      });

    });
 
  });

  describe ('GET /carts and GET /carts/:id route test', function() {

    describe('GET /carts success test', function() {

      it('should return a 200 status code and array of cart objects that belongs to authorized user', function(done) {

        chai
          .request(app)
          .get('/carts')
          .set('Authorization', token1)
          .end(function(err, res) {
            expect(err).to.be.null;

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.above(-1);
            done();
          });

      });
      
    });

    describe('GET /carts error test', function() {

      it('should not allow unauthenticated user', function(done) {
        chai
          .request(app)
          .get('/carts')
          .end(function(err, res) {
            expect(err).to.be.null;

            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.equal('Unauthorized');
            done();
          });
      });

    });

    describe('GET /carts/:id success test', function() {

      it('should return a 200 status code and a cart object that belongs to authorized user(buyerId)', function(done) {
        chai
        .request(app)
        .get(`/carts/${testCart1}`)
        .set('Authorization', token2)
        .end(function(err, res) {
          expect(err).to.be.null;

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.all.keys('_id', 'productId', 'quantity', 'amount', 'sellerId', 'buyerId', 'status');
          expect(res.body.productId).to.be.an('object');
          expect(res.body.productId).to.include.all.keys('_id', 'name', 'stock', 'price', 'url', 'description', 'sellerId');
          expect(res.body.productId.sellerId.toString()).to.be.equal(res.body.sellerId.toString());
          expect(res.body.buyerId.toString()).to.be.equal(user2.toString());
          done();
        });
      });

    });

    describe('GET /carts/:id error test', function() {

      it('should not allow unauthenticated user', function(done) {
        chai
        .request(app)
        .get(`/carts/${testCart1}`)
        .end(function(err, res) {
          expect(err).to.be.null;

          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message).to.equal('Unauthorized');
          done();
        });
      });

      it('should not allow unauthorized user', function(done) {
        chai
        .request(app)
        .get(`/carts/${testCart1}`)
        .set('Authorization', token1)
        .end(function(err, res) {
          expect(err).to.be.null;

          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message).to.equal('Unauthorized');
          done();
        });
      });

      it('should not allow invalid cart id', function(done) {
        chai
        .request(app)
        .get(`/carts/${ObjectId('5cd123912678251be72a0b15')}`)
        .set('Authorization', token1)
        .end(function(err, res) {
          expect(err).to.be.null;

          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message).to.equal('Cart not found');
          done();
        });
      });

    });
      

  });

  describe('DELETE /carts and /carts/:id route test', function() {

    before(function(done) {
      createTestCart(done, testProduct2, user2, user1)
        .then((cartId) => {
          cartToDelete = cartId;
        })
        .catch((error) => {
          console.log(error);
        })
    });

    describe('DELETE /carts success test', function() {
      
      it('should remove all carts that belongs to the authorized user and return a 204 status code and give a no content', function(done) {
        chai
          .request(app)
          .delete('/carts')
          .set('Authorization', token2)
          .end(function(err, res) {
            expect(err).to.be.null;
            
            expect(res).to.have.status(204);
            expect(res.body).to.be.an('object');
            expect(res.body).to.be.empty;
            done();
          });
      });

    });

    describe('DELETE /carts error test', function() {

      it('should not allow unauthorized user', function(done) {
        chai
          .request(app)
          .delete('/carts')
          .end(function(err, res) {
            expect(err).to.be.null;

            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.equal('Unauthorized');
            done();
          });
      });

    });

    describe('DELETE /carts/:id success test', function() {

      it('should remove a cart object and return a 204 status code and give a no content', function(done) {
        chai
          .request(app)
          .delete(`/carts/${cartToDelete}`)
          .set('Authorization', token1)
          .end(function(err, res) {
            expect(err).to.be.null;

            expect(res).to.have.status(204);
            expect(res.body).to.be.an('object');
            expect(res.body).to.be.empty;
            done();
          });
      });

    });

    describe('DELETE /carts/:id error test', function() {

      it('should not allow unauthorized user', function(done) {
        chai
          .request(app)
          .delete(`/carts/${testCart1}`)
          .set('Authorization', token1)
          .end(function(err, res) {
            expect(err).to.be.null;

            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.equal('Unauthorized');
            done();
          });
      });

      it('should not allow invalid cart id', function(done) {
        chai
        .request(app)
        .delete(`/carts/${ObjectId('5cd123912678251be72a0b15')}`)
        .set('Authorization', token1)
        .end(function(err, res) {
          expect(err).to.be.null;
          console.trace(res.body)
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message).to.equal('Cart not found');
          done();
        });
      });

    });

  });

});