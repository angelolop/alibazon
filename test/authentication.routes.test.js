const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

describe('Register', () => {
    it("Render register page", () => {
        chai.request(app)
        .get('/register')
        .end((err, res) => {
            expect(res);
        });
    });
    it("Create an account", () => {
        chai.request(app)
        .post('/register')
        .send({
            'name': 'access',
            'email': 'access29@gmail.com',
            'password': '1234',
            'confirmPassword': '1234'
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
        });
    });
});

describe('Login', () => {
    it("Render the login page", () => {
        chai.request(app)
        .get('/login')
        .end((err, res) => {
            expect(res).to.have.status(200);
        });
    });
    it("Login into the site", () => {
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
        });
    });
});

describe('Logout', () => {
    it("Logout from the site", (done) => {
        chai.request(app)
        .get('/logout')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
});