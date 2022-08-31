const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

describe('Cart', () => {
    it('Unathorized Cart Page', () => {
        chai.request(app)
        .get('/cart')
        .end((err, res) => {
            expect(res).to.have.status(200);
        });
    });
    it('Unathorized change quantity', () => {
        chai.request(app)
        .post('/cart/changeQuantity')
        .send({
            'productId': '86736845',
            'variantId': '883360544250',
            'quantity': '4'
        })
        .end((error, res) => {
            expect(error);
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
        .end((error, res) => {
            expect(error);
        })
    })
});