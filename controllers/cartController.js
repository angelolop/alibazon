const api = "https://backend-academy-osf.herokuapp.com/api/";
const secretKey = "$2a$08$p3my8MGizWp3L8f6sn0PCO2c4mLv.mewFcpcfy8pGxHFi0iT4cUX.";
const axios = require("axios");

exports.cartPage = async (req, res, next) =>  {
    const query = await axios.get (api + '/cart', {
    headers: {
        "Authorization": `Bearer ${req.session.userId}`
    },
    params: {secretKey: secretKey}
    });
    res.render("cart", {cardsFromCart: query.data.items, header: false});
};

exports.addItemCart = async (req, res, next) => {
    await axios.post (api + '/cart/addItem', {
            secretKey: secretKey,
            productId: req.body.productId,
            variantId: req.body.variantId,
            quantity: req.body.quantity},
            {
        headers: {"Authorization": `Bearer ${req.session.userId}`}
    }, res.redirect("/"))
}

exports.changeQuantityItemCart = async (req, res, next) => {
    await axios.post (api + '/cart/changeItemQuantity', {
        secretKey: secretKey,
        productId: req.body.productId,
        variantId: req.body.variantId,
        quantity: req.body.quantity},
        {
    headers: {"Authorization": `Bearer ${req.session.userId}`}
    }, res.redirect("/"))
}

exports.deleteItemCart = async (req, res, next) => {
    await axios.delete (api + '/cart/removeItem', {
        headers: {"Authorization": `Bearer ${req.session.userId}`},
        data: {
            secretKey: secretKey,
            productId: req.body.productId,
            variantId: req.body.variantId
        }
    }, res.redirect("/"));
}

