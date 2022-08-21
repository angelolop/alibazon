const express = require("express");
const router = express.Router();
const secretKey = "$2a$08$p3my8MGizWp3L8f6sn0PCO2c4mLv.mewFcpcfy8pGxHFi0iT4cUX."
const api = "https://backend-academy-osf.herokuapp.com/api/"
const axios = require("axios");
const User = require("../models/user");

router.get("/", (req, res) => {
    res.redirect("/category/mens")
});

router.get("/category/:id", async (req, res) => { 
    let id = req.params.id;  //Route home, for categories
    const query = await axios.get(api + 'categories/parent/' + id, {// Put men or women depending on the request
    params: {
        secretKey: secretKey
        }
    });
    const teste = await axios.get(api + 'categories/' + id, {// Put men or women depending on the request
    params: {
        secretKey: secretKey
        }   
    });
    if (id.length > 18 || id === "womens-outfits") {
        let id = req.params.id;
        res.redirect("/products/" + id);
    };
    res.render("categories", { cardsOfCategories: query.data, jumbotron: true, jumbotronDescription: teste.data});
}); 

router.get("/products/:id", async (req, res) => {
    let identification = req.params.id;   //Route for the especified product
    const query = await axios.get(api + 'products/product_search?page=1&primary_category_id=' + identification, {
    params: {
        secretKey: secretKey
        }
    });
    res.render("products", { cardsOfProducts: query.data, jumbotron: false});
});

router.get("/product/:id", async (req, res) => { 
    let id = req.params.id;
    const query = await axios.get(api + "products/product_search?id=" + id, {
    params: {
        secretKey: secretKey
        }
    });
    res.render("singleProduct", { product: query.data, jumbotron: false});
});

router.get('/register', function (req, res, next){
    return res.render('register', { title: 'Sing Up', header: 'false', jumbotron: false});
});

router.post('/register', function (req, res, next){
    if (req.body.email &&
        req.body.name &&
        req.body.password &&
        req.body.confirmPassword) {
            //confirm that user typed same password twice
            if (req.body.password !== req.body.confirmPassword) {
                var err = new Error ('Password do not match.');
                err.status = 400;
                return next(err)
            }
            //create object with form input
            var userData = {
                email: req.body.email,
                name: req.body.name, 
                password: req.body.password
            };
            //use schema's "create" method to insert document into mongo
            User.create(userData, function (error, user) {
                if (error) {
                    return next (error);
                } else {
                    return res.redirect('/');
                }
            });
        } else {
            var err = new Error('All files required.');
            err.status = 400;
            return next (err);
        }
    }
);

module.exports = router;