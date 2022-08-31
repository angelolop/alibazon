const config = require('../config');

exports.redirect = async (req, res) => {
    try {
        res.redirect('/category/womens')
    } catch (error) {
        let err = new Error ('Tente novamente')
        res.render('error', {err, header: false})
    };
};

exports.categories = async (req, res) => {
    let reqId = req.params.id;

    try {
        const query = await config.api.get('categories/parent/' + reqId, config.param);
        const jumbotronDescription = await config.api.get('categories/' + reqId, config.param);
        
        if (reqId.length > 18 || reqId === 'womens-outfits') {
            res.redirect('/products/' + reqId);
        };
        res.render('categories', { 
            cardsOfCategories: query.data, jumbotron: true, jumbotronDescription: jumbotronDescription.data
        });
    } catch (error) {
        let err = new Error ('Tente novamente')
        res.render('error', {err, header: false});
    };
};

exports.products = async (req, res) =>  {
    try {
        const query = await config.api.get('products/product_search?page=1&primary_category_id=' + req.params.id, config.param);

        res.render('products', {cardsOfProducts: query.data, jumbotron: false});
    } catch (error) {
        let err = new Error ('Tente novamente')
        res.render('error', {err, header: false})
    };
};

exports.singleProduct = async (req, res) => { 
    try {
        const query = await config.api.get('products/product_search?id=' + req.params.id, config.param);

        res.render('singleProduct', {product: query.data, jumbotron: false});
    } catch (error) {
        let err = new Error ('Tente novamente')
        res.render('error', {err, header: false})
    };
};