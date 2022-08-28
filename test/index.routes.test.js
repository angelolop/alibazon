const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

describe('Displaying categories and products', () => {
    it('Page for the gender category', () => {
        chai.request(app)
        .get("/category/womens")
        .end((err, res) => {
            expect(res).to.have.status(200);
        });
    });
});

describe('Displaying products', () => {
    it('Page cards of products', () => {
        chai.request(app)
        .get("/products/mens-accessories-luggage")
        .end((err, res) => {
            expect(res).to.have.status(200);
        });
    });
    it('Page for an especific product', () => {
        chai.request(app)
        .get("/product/25565189")
        .end((err, res) => {
            expect(res).to.have.status(200);
        });
    });
});
