const express = require("express");
const router = express.Router();
const secretKey = "$2a$08$p3my8MGizWp3L8f6sn0PCO2c4mLv.mewFcpcfy8pGxHFi0iT4cUX."
const api = "https://backend-academy-osf.herokuapp.com/api/"
const axios = require("axios");
const User = require("../models/user");
const middle = require ('../middleware');

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

router.get('/register', middle.loggedOut, function (req, res, next){
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
                    req.session.userId = user._id;
                    return res.redirect('/');
                }
            });
        } else {
            var err = new Error('All files required.');
            err.status = 400;
            return next (err);
        }
});

// GET /login
router.get('/login', middle.loggedOut, function (req, res, next) {
    return res.render ('login', {title: 'log in', header: 'false'});
  });
  
// POST /login
router.post('/login', function (req, res, next) {
    if (req.body.email && req.body.password) {
      User.authenticate(req.body.email, req.body.password, function (error, user){
        if (error || !user) {
          var err = new Error('Worng email or password.');
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });
    } else {
        var err = new Error('Email and password are required.');
        err.status = 401;
        return next(err)
    }
})

// GET /logout
router.get('/logout', function(req, res, next) {
    if (req.session) {
        req.session.destroy (function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect("/");
            }
        })
    }
})


// GET /profile
router.get('/profile', middle.requiresLogin, function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
          if (error) {
            return next(error);
          } else {
            return res.render('profile', {name: user.name, header: 'false'});
          }
        });
});

module.exports = router;