const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

describe('Authentication', () => 
    describe('Validating authentication', () => {
        it("add one person", (done) => {
            chai.request(app)
            .post('/register')
            .send({
                'name': 'mocha',
                'email': 'mocha35@gmail.com',
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
                'name': 'mocha',
                'email': 'mocha@gmail.com',
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
                'name': 'mocha',
                'email': 'mocha@gmail.com',
                'password': '1234',
                'confirmPassword': '1234'
            })
            .end((err, res) => {
            expect(res).to.have.status(200);
            done();
            });
        });
    })
)