const api = "https://backend-academy-osf.herokuapp.com/api/";
const secretKey = "$2a$08$p3my8MGizWp3L8f6sn0PCO2c4mLv.mewFcpcfy8pGxHFi0iT4cUX.";
const axios = require("axios");


exports.cart = async (req, res) =>  {
    const query = await axios.get(api + '/cart', {
    headers: {
        "Authorization": `Bearer ${req.session.userId}`
    },
    params: {
        secretKey: secretKey
        }
    });
    res.render("cart", { teste: query, header: false});
};
