const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const api = 'https://backend-academy-osf.herokuapp.com/api';
const key = '?secretKey=$2a$08$p3my8MGizWp3L8f6sn0PCO2c4mLv.mewFcpcfy8pGxHFi0iT4cUX.'

chai.use(chaiHttp);

describe('Categories', () => 
  describe('/GET Categories', () => {
    it('Testing GET for all the categories', (done) => {
      chai.request(api) 
          .get('/categories' + key) 
          .end((err, res) => { 
              res.should.have.status(200); 
              res.body.should.be.a('array'); 
            done();
          });
    });
    it('Testing GET for a specific category with parent', (done) => {
      chai.request(api) 
          .get('/categories/parent/mens-clothing' + key) 
          .end((err, res) => { 
              res.should.have.status(200); 
              res.body.should.be.a('array'); 
            done();
          });
      });
    it('Testing GET for a specific category with ID', (done) => {
      chai.request(api) 
          .get('/categories/mens-clothing' + key) 
          .end((err, res) => { 
              res.should.have.status(200); 
              res.body.should.be.a('object'); 
            done();
          });
      });  
    })
);
