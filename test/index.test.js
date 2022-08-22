const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

describe('Categories', () => 
    describe('/GET Categories', () => {
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
        it("add one person", (done) => {
            chai.request(app)
            .post('/register')
            .send({
                'email': 'mocha21@gmail.com',
                'name': 'mocha',
                'password': '1234',
                'confirmPassword': '1234'
            })
            .end((err, res) => {
            expect(res).to.have.status(200);
            done();
            });
        });
        it("login into the site", (done) => {
            chai.request(app)
            .post('/login')
            .send({
                'email': 'mocha@gmail.com',
                'name': 'mocha',
                'password': '1234',
                'confirmPassword': '1234'
            })
            .end((err, res) => {
            expect(res).to.have.status(200);
            done();
            });
        });
        it("logout from the site", (done) => {
            chai.request(app)
            .get('/logout')
            .send({
                'email': 'mocha@gmail.com',
                'name': 'mocha',
                'password': '1234',
                'confirmPassword': '1234'
            })
            .end((err, res) => {
            expect(res).to.have.status(200);
            done();
            });
        });
    })
);