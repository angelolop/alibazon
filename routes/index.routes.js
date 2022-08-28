const express = require("express");
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get("/", indexController.redirect);

router.get("/category/:id", indexController.categories); 

router.get("/products/:id", indexController.products);

router.get("/product/:id", indexController.singleProduct);
    
module.exports = router;