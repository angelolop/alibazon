const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

describe('Register', () => {
    it('Render register page', () => {
        chai.request(app)
        .get('/register')
        .end((err, res) => {
            expect(res).to.have.status(200);
        });
    });
    it('Create an account', () => {
        chai.request(app)
        .post('/register')
        .send({
            'name': 'access',
            'email': 'access170@gmail.com',
            'password': '1234',
            'confirmPassword': '1234'
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
        });
    });
    it('All files required for an account', () => {
        chai.request(app)
        .post('/register')
        .send({
            'name': 'test',
            'confirmPassword': '1234'
        })
        .end((error, res) => {
            expect(error);
        });
    });
    it('Error passowords do not match', () => {
        chai.request(app)
        .post('/register')
        .send({
            'name': 'assess',
            'email': 'assess2@gmail.com',
            'password': '1234'
        })
        .end((error, res) => {
            expect(error);
        });
    });
    it('Error user already exists', () => { 
        chai.request(app)
        .post('/register')
        .send({
            'name': 'test',
            'email': 'test@gmail.com',
            'password': '1234',
            'confirmPassword': '1234'
        })
        .end((error, res) => {
            expect(error);
        });
    });
});

describe('Login', () => {
    it('Render the login page', () => {
        chai.request(app)
        .get('/login')
        .end((err, res) => {
            expect(res).to.have.status(200);
        });
    });
    it('Login into the site', () => {
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
    it('Error you must be logged for view the profile page', () => {
        chai.request(app)
        .get('/profile')
        .end((error, res) => {
            expect(error);
        });
    });
    it('Email and password are required for login', () => {
        chai.request(app)
        .post('/login')
        .send({
            'name': 'test',
            'confirmPassword': '1234'
        })
        .end((error, res) => {
            expect(error);
        });
    });
    it('Logout from the site', () => {
        chai.request(app)
        .get('/logout')
        .end((error, res) => {
            expect(error);
        });
    });
});