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
  dropAll,
} = testHelper;

let token1 = '',
    token2 = '',
    user1 = '',
    user2 = '',
    testProduct1 = '',
    testProduct2 = '',
    testProduct3 = '';



describe('Products', function() { 

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
          testProduct2 = products.productOneId;
          testProduct3 = products.productTwoId;
        })
        .catch((error) => {
          console.log(error)
        })
      
  });
  
  after(function(done) {
    dropAll(done);
  });

  describe('POST /products route test', function() {

    describe('POST /products success test', function() {
  
      it('should add a new product and return a 201 status code with a product object', function(done) {
        const testProduct = {
          name: 'testProduct',
          stock: 99,
          price: 10000,
          url: 'https://somecloud.com/product.img',
          description: 'amazing product',
          sellerId: user1,
        };
    
        chai
          .request(app)
          .post('/products')
          .send(testProduct)
          .set('authorization', token1)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.include.all.keys('_id', 'name', 'stock', 'price', 'url', 'description', 'sellerId');
            testProduct1 = res.body._id;
            done();
          });
      });
      
    });
  
    describe('POST /products error test', function() {
      
      it('should not allow empty product name', function(done) {
        const testProduct = {
          name: '',
          stock: 99,
          price: 10000,
          url: 'https://somecloud.com/product.img',
          description: 'amazing product',
          sellerId: user1,
        };
  
        chai
          .request(app)
          .post('/products')
          .send(testProduct)
          .set('Authorization', token1)
          .end(function(err, res) {
            expect(err).to.be.null;
  
            expect(res).to.have.status(409);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.match(/(Product name cannot be empty)/g);
            done();
          });
      });
  
      it('should not allow invalid stock', function(done) {
        const testProduct = {
          name: 'testProduct',
          stock: 0,
          price: 10000,
          url: 'https://somecloud.com/product.img',
          description: 'amazing product',
          sellerId: user1,
        };
  
        chai
          .request(app)
          .post('/products')
          .send(testProduct)
          .set('Authorization', token1)
          .end(function(err, res) {
            expect(err).to.be.null;
  
            expect(res).to.have.status(409);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.match(/(Stock cannot be lower than 1)/g);
            done();
        });
      });
  
      it('should not allow invalid price', function(done) {
        const testProduct = {
          name: 'testProduct',
          stock: 99,
          price: -1,
          url: 'https://somecloud.com/product.img',
          description: 'amazing product',
          sellerId: user1,
        };
  
        chai
          .request(app)
          .post('/products')
          .send(testProduct)
          .set('Authorization', token1)
          .end(function(err, res) {
            expect(err).to.be.null;
  
            expect(res).to.have.status(409);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.match(/(Price cannot be lower than 0)/g);
            done();
        });
      });
  
      it('should not allow unauthenticated user', function(done) {
        const testProduct = {
          name: 'testProduct',
          stock: 99,
          price: 10000,
          url: 'https://somecloud.com/product.img',
          description: 'amazing product',
          sellerId: user1,
        };
  
        chai
          .request(app)
          .post('/products')
          .send(testProduct)
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

  describe('GET /products and GET /products/:id route test', function() {
    
    describe('GET /products success test', function() {
      it('should return a 200 status code and an array of products', function(done) {
        chai
          .request(app)
          .get('/products')
          .end(function(err, res) {
            expect(err).to.be.null;
  
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.above(-1);
            done();
          });
      });

    });

    describe ('GET /products/:id success test', function() {

      it('should return a 200 status code and a product based on input id', function(done) {
       
        chai
          .request(app)
          .get(`/products/${testProduct1}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            
            expect(res).to.have.status(200);
            expect(res.body).be.an('object');
            expect(res.body).to.include.all.keys('_id', 'name', 'stock', 'price', 'url', 'description', 'sellerId');
            expect(res.body._id).to.equal(testProduct1);
            done();
          });

      });

    });
  
  });

  describe('PUT /products/:id route', function() {

    describe('PUT /products/:id success test', function() {
      it('should return a 200 status code and a product with updated fields', function(done) {
        const updatedTestProduct = {
          name: 'updatedTestProduct',
          stock: 99,
          price: 10000,
          url: 'https://somecloud.com/product.img',
          description: 'amazing product',
          
        };

        chai
          .request(app)
          .put(`/products/${testProduct1}`)
          .send(updatedTestProduct)
          .set('Authorization', token1)
          .end(function(err, res) {
            expect(err).to.be.null;
            
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.include.all.keys('_id', 'name', 'stock', 'price', 'url', 'description', 'sellerId');
            expect(res.body._id).to.equal(testProduct1);
            expect(res.body.name).to.equal('updatedTestProduct');
            done();
          });
      });

    });

    describe('PUT /products/:id error test', function() {

      it('should not allow unauthorized user', function(done) {
        const updatedTestProduct = {
          name: 'updatedTestProduct',
          stock: 99,
          price: 10000,
          url: 'https://somecloud.com/product.img',
          description: 'amazing product',
          
        };

        chai
          .request(app)
          .put(`/products/${testProduct1}`)
          .set('Authorization', token2)
          .send(updatedTestProduct)
          .end(function(err, res) {
            expect(err).to.be.null;

            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.equal('Unauthorized');
            done();
          });

      });

      it('should not allow invalid product id', function(done) {
        
        const updatedTestProduct = {
          name: 'updatedTestProduct',
          stock: 99,
          price: 10000,
          url: 'https://somecloud.com/product.img',
          description: 'amazing product',
        };

        chai
          .request(app)
          .put(`/products/${ObjectId('5cd123912678251be72a0b15')}`)
          .send(updatedTestProduct)
          .set('Authorization', token1)
          .end(function(err, res) {
            expect(err).to.be.null;
      
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.equal('Product not found');
            done();
          });

      });
     
    });

  });

  describe('DELETE /products/:id route', function() {

    describe('DELETE /products/:id success test', function() {

      it('should return a 204 status code with no content', function(done) {
        chai
          .request(app)
          .delete(`/products/${testProduct1}`)
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

    describe('DELETE /products/:id error test', function() {

      it('should not allow unauthorized user', function(done) {
        chai
          .request(app)
          .delete(`/products/${testProduct2}`)
          .set('Authorization', token2)
          .end(function(err, res) {
            expect(err).to.be.null;

            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.equal('Unauthorized');
            done();
          });
      });

      it('should not allow invalid product id', function(done) {
        chai
        .request(app)
        .delete(`/products/${ObjectId('5cd123912678251be72a0b15')}`)
        .set('Authorization', token1)
        .end(function(err, res) {
          expect(err).to.be.null;
    
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message).to.equal('Product not found');
          done();
        });
      });

    });

  });

});
