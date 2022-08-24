"use strict";

var app = require("../app");

var chai = require("chai");

var chaiHttp = require("chai-http");

var expect = chai.expect;
chai.use(chaiHttp);
describe('Authentication', function () {
  return describe('Validating authentication', function () {
    it("add one person", function (done) {
      chai.request(app).post('/register').send({
        'email': 'mocha30@gmail.com',
        'name': 'mocha',
        'password': '1234',
        'confirmPassword': '1234'
      }).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it("login into the site", function (done) {
      chai.request(app).post('/login').send({
        'email': 'mocha@gmail.com',
        'name': 'mocha',
        'password': '1234',
        'confirmPassword': '1234'
      }).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it("logout from the site", function (done) {
      chai.request(app).get('/logout').send({
        'email': 'mocha@gmail.com',
        'name': 'mocha',
        'password': '1234',
        'confirmPassword': '1234'
      }).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
});