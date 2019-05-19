const chai  = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const app = require('../server');
const testHelper = require('../helpers/test');

const { dropUsers } = testHelper;


before (function(done) {
  dropUsers(done);
});

after( function(done) {
  dropUsers(done);
});

describe ('Users', function() {

  describe('POST /register route', function() {

    describe('POST /register success test', function() {

      it('should create a new user with given fields and return a 201 status code, token and currentUser object', function(done) {
        const testUser = {
          username: 'john',
          email: 'john@mail.com',
          password: '123',
        };

        chai
          .request(app)
          .post('/register')
          .send(testUser)
          .end(function(err, res) {
            expect(err).to.be.null;

            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('token');
            expect(res.body).to.have.property('currentUser');
            expect(res.body.token).to.be.a('string');
            expect(res.body.currentUser).to.be.an('object');
            expect(res.body.currentUser).to.have.property('userId');
            expect(res.body.currentUser).to.have.property('email');
            expect(res.body.currentUser.email).to.equal('john@mail.com');
            done();
          });     
      });

    });

    describe('POST /register error tests', function() {

      it('should not allow invalid email format', function(done) {
        const testUser = {
          username: 'john',
          email: 'johnmail.com',
          password: '123',
        };

        chai
          .request(app)
          .post('/register')
          .send(testUser)
          .end(function(err, res) {
            expect(err).to.be.null
          
            expect(res).to.have.status(409);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.match(/(Invalid email format)/g);
            done();
          });
      });

      it('should not allow duplicate email', function(done) {
        const testUser = {
          username: 'john',
          email: 'john@mail.com',
          password: '123',
        };

        chai
        .request(app)
        .post('/register')
        .send(testUser)
        .end(function(err, res) {
          expect(err).to.be.null;

          expect(res).to.have.status(409);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message).to.match(/(Email is already in use)/g);
          done();
        });

      });

      it('should not allow empty email', function(done) {
        const testUser = {
          username: 'johny',
          email: '',
          password: '123',
        };

        chai
          .request(app)
          .post('/register')
          .send(testUser)
          .end(function(err, res) {
            expect(err).to.be.null;

            expect(res).to.have.status(409);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.match(/(Email cannot be empty)/g);
            done();
          });
      });

      it('should not allow empty password', function(done) {
        const testUser = {
          username: 'johny',
          email: 'johny@mail.com',
          password: '',
        };

        chai
          .request(app)
          .post('/register')
          .send(testUser)
          .end(function(err, res) {
            expect(err).to.be.null;

            expect(res).to.have.status(409);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.match(/(Password cannot be empty)/g);
            done();
          });
      });

    });

  });

  describe('POST /login route ', function() {

    describe('POST /login success test', function() {

      it('should return a 200 status code token and currentUser object', function(done) {
        const credentials = {
          email: 'john@mail.com',
          password: '123',
        };

        chai
          .request(app)
          .post('/login')
          .send(credentials)
          .end(function(err, res) {
            expect(err).to.be.null

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('token');
            expect(res.body).to.have.property('currentUser');
            expect(res.body.token).to.be.a('string');
            expect(res.body.currentUser).to.be.an('object');
            expect(res.body.currentUser).to.have.property('userId');
            expect(res.body.currentUser).to.have.property('email');
            done();
          });
      });

    });

    describe('POST /login error test', function() {

      it('should not allow incorrect email', function(done) {
        const credentials = {
          email: 'invalidemail',
          password: '123',
        };

        chai
          .request(app)
          .post('/login')
          .send(credentials)
          .end(function(err, res) {
            expect(err).to.be.null
            
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.match(/(Wrong email\/password)/g);
            done();
          });
      });

      it('should not allow incorrect password', function(done) {
        const credentials = {
          email: 'john@mail.com',
          password: 'wrongpassword',
        };
        
        chai
          .request(app)
          .post('/login')
          .send(credentials)
          .end(function(err, res) {
            expect(err).to.be.null;

            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.match(/(Wrong email\/password)/g);
            done();
          });
      });

    });

  });

});
