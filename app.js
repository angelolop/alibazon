const express = require("express");
const app = express();
const Sentry = require('@sentry/node'); // Error tracking mandatory, observed in topic 4.8 - Error Tracking, in the learning hub 
const Tracing = require('@sentry/tracing'); // Tracing required for sentry 
const bodyParser = require("body-parser");
const session = require('express-session');
const routes1 = require('./routes/index.routes.js');
const routes2 = require('./routes/authentication.routes.js');
const routes3 = require('./routes/cart.routes.js');
const YAML = require ('yamljs');
const swaggerJsDocs = YAML.load('./alibazon.yaml');
const swaggerUI = require('swagger-ui-express');
var methodOverride = require('method-override')

Sentry.init({                 // code required for sentry (error tracking)
    dsn: "https://df3e3800fa8648b3bfc0c2e2bf19b72a@o1354822.ingest.sentry.io/6638753",  
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use('/alibazon-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

// use sessions for tracking logins
app.use(session({
    secret: 'alibazon secret',
    resave: true,
    saveUninitialized: false
}));

//make user ID available in templates
app.use(function (req, res, next) {
    res.locals.currentUser = req.session.userId;
    next();
});

app.use(methodOverride('_method'));

app.use(Sentry.Handlers.requestHandler()); //Handlers for sentry (error tracking)
app.use(Sentry.Handlers.tracingHandler()); //Handlers for sentry (error tracking)
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(routes1);
app.use(routes2);
app.use(routes3);
app.use(Sentry.Handlers.errorHandler()); //error handler necessary for Sentry

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.set("view engine", "pug");

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port 3000...`);
});

module.exports = app;