"use strict";

var app = require("../app");

var chai = require("chai");

var chaiHttp = require("chai-http");

var expect = chai.expect;
chai.use(chaiHttp);
describe('Categories', function () {
  return describe('Displaying categories and products', function () {
    it('Testing GET for the gender category', function (done) {
      chai.request(app).get("/").end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('Testing GET for products', function (done) {
      chai.request(app).get("/products/mens-accessories-luggage").end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('Testing GET for products', function (done) {
      chai.request(app).get("/product/25565189").end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
});