const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const api = 'https://backend-academy-osf.herokuapp.com/api';
const key = '&secretKey=$2a$08$p3my8MGizWp3L8f6sn0PCO2c4mLv.mewFcpcfy8pGxHFi0iT4cUX.'

chai.use(chaiHttp);

describe('Products', () => 
  describe('/GET Products', () => {
    it('Testing GET for products with primary category', (done) => {
      chai.request(api) 
          .get('/products/product_search?primary_category_id=womens-clothing-tops' + key) 
          .end((err, res) => { 
              res.should.have.status(200); 
              res.body.should.be.a('array'); 
            done();
          });
    });
    it('Testing GET for products with ID', (done) => {
      chai.request(api) 
          .get('/products/product_search?id=25565189' + key) 
          .end((err, res) => { 
              res.should.have.status(200); 
              res.body.should.be.a('array'); 
            done();
          });
      });
    })
);