const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cartController');
const mid = require('../middlewares');

router.get('/cart', mid.requiresLogin, cartController.cartPage);

router.post('/cart', cartController.addItemCart)

router.post('/cart/changeQuantity', cartController.changeQuantityItemCart);

router.delete('/cart', cartController.deleteItemCart);

module.exports = router;