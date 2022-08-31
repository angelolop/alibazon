const routeIndex = require('./index.routes.js');
const routeAuthentication = require('./authentication.routes.js');
const routeCart = require('./cart.routes.js');
const bodyParser = require("body-parser");

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));

    app.use(routeIndex, routeAuthentication, routeCart);
};