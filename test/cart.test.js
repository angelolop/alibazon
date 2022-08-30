const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

describe('Cart', () => {
    it('Unathorized Cart Page', () => {
        chai.request(app)
        .get('/cart')
        .end((err, res) => {
            expect(res).to.have.status(401);
        });
    });
    it('Unathorized Buy product', () => {
        chai.request(app)
        .post('/cart')
        .send({
            'productId': '86736845',
            'variantId': '883360544250',
            'quantity': '1'
        })
        .end((err, res) => {
            expect(err);
        })
    })
    it('Unathorized change quantity', () => {
        chai.request(app)
        .post('/cart/addItem')
        .send({
            'productId': '86736845',
            'variantId': '883360544250',
            'quantity': '4'
        })
        .end((err, res) => {
            expect(err);
        })
    })
    it('Unathorized delete product', () => {
        chai.request(app)
        .delete('/cart')
        .send({
            'productId': '86736845',
            'variantId': '883360544250',
            'quantity': '4'
        })
        .end((err, res) => {
            expect(err);
        })
    })
});