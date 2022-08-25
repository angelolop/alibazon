const express = require("express");
const router = express.Router();
const secretKey = "$2a$08$p3my8MGizWp3L8f6sn0PCO2c4mLv.mewFcpcfy8pGxHFi0iT4cUX."
const api = "https://backend-academy-osf.herokuapp.com/api/"
const axios = require("axios");

router.get("/", (req, res) => {
    res.redirect("/category/womens")
});

router.get("/category/:id", async (req, res) => { 
    let reqId = req.params.id
    const query = await axios.get(api + 'categories/parent/' + reqId, {// Put men or women depending on the request
    params: {
        secretKey: secretKey
        }
    });
    const jumbotronDescription = await axios.get(api + 'categories/' + reqId, { // breadcrumbs
    params: {
        secretKey: secretKey
        }   
    });
    if (reqId.length > 18 || reqId === "womens-outfits") {
        res.redirect("/products/" + reqId);
    };
    res.render("categories", { cardsOfCategories: query.data, jumbotron: true, jumbotronDescription: jumbotronDescription.data});
}); 

router.get("/products/:id", async (req, res) => {   //Route for the especified product
    const query = await axios.get(api + 'products/product_search?page=1&primary_category_id=' + req.params.id, {
    params: {
        secretKey: secretKey
        }
    });
    res.render("products", { cardsOfProducts: query.data, cardsOfCategories: false, jumbotron: false});
});

router.get("/product/:id", async (req, res) => { 
    const query = await axios.get(api + "products/product_search?id=" + req.params.id, {
    params: {
        secretKey: secretKey
        }
    });
    res.render("singleProduct", { product: query.data, jumbotron: false});
});
    
module.exports = router;