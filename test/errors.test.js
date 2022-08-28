const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

describe('Errors', () => {
    it("All files required for an account", () => {
        chai.request(app)
        .post('/register')
        .send({
            'name': 'test',
            'confirmPassword': '1234'
        })
        .end((err, res) => {
            expect(err);
        });
    });
    it("Error passowords do not match", (done) => {
        chai.request(app)
        .post('/register')
        .send({
            'name': 'assess',
            'email': 'assess1@gmail.com',
            'password': '555',
            'confirmPassword': '1234'
        })
        .end((err, res) => {
            expect(err);
            done();
        });
    });
    it("Error user already exists", () => { ///ATTENTION
        chai.request(app)
        .post('/register')
        .send({
            'name': 'test',
            'email': 'test@gmail.com',
            'password': '1234',
            'confirmPassword': '1234'
        })
        .end((err, res) => {
            expect(err);
        });
    });
    it("Error you must be logged for view the profile page", (done) => {
        chai.request(app)
        .get('/profile')
        .end((err, res) => {
            expect(err);
            done();
        });
    });
    it("Email and password are required for login", () => {
        chai.request(app)
        .post('/login')
        .send({
            'name': 'test',
            'confirmPassword': '1234'
        })
        .end((err, res) => {
            expect(err);
        });
    });
    it('Error you must be logged for logout', () => {
        it("Logout from the site", (done) => {
            chai.request(app)
            .get('/logout')
            .end((err, res) => {
                expect(err);
                done();
            });
        });
    });
});