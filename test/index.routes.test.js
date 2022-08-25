const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

describe('Categories', () => 
    describe('Displaying categories and products', () => {
        it('Testing GET for the gender category', (done) => {
            chai.request(app)
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
        it('Testing GET for products', (done) => {
            chai.request(app)
            .get("/products/mens-accessories-luggage")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
        it('Testing GET for products', (done) => {
            chai.request(app)
            .get("/product/25565189")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
    })
);