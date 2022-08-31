
const config = require('../config')

exports.cartPage = async (req, res, next) =>  {
    try {
        const query = await config.api.get ('/cart', {
            headers: {
                'Authorization': `Bearer ${req.session.userId}`
            }, 
            params: { secretKey: config.secretKey }
        });
        res.render('cart', {cardsFromCart: query.data.items, header: false})
    } catch (error) {
        let err = new Error ('You must add something to cart to view this page');
        res.render('error', {err, header: false});
    };
};

exports.addItemCart = async (req, res, next) => {
    try {
        await config.api.post ('/cart/addItem', {
            secretKey: config.secretKey,
            productId: req.body.productId,
            variantId: req.body.variantId,
            quantity: req.body.quantity
        }, 
        { headers: { 'Authorization': `Bearer ${req.session.userId}`} }
        ,res.redirect('back'));
    } catch (error) {
        let err = new Error ('Tente novamente')
        res.render('error', {err, header: false});
    };
};

exports.changeQuantityItemCart = async (req, res, next) => {
    try {
        await config.api.post ('/cart/changeItemQuantity', {
            secretKey: config.secretKey,
            productId: req.body.productId,
            variantId: req.body.variantId,
            quantity: req.body.quantity
        }, 
        { headers: {'Authorization': `Bearer ${req.session.userId}`}})
        res.redirect('back')
    } catch (error) {
        let err = new Error ('Tente novamente')
        res.render('error', {err, header: false});
    };
};

exports.deleteItemCart = async (req, res, next) => {
    try {
        await config.api.delete ('/cart/removeItem', {
            headers: {'Authorization': `Bearer ${req.session.userId}`},
            data: {
                secretKey: config.secretKey,
                productId: req.body.productId,
                variantId: req.body.variantId
            }
        })
        res.redirect('back')
    } catch (error) {
        let err = new Error ('Tente novamente')
        res.render('error', {err, header: false});
    };
};