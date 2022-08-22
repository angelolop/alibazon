const express = require("express");
const app = express();
const Sentry = require('@sentry/node'); // Error tracking mandatory, observed in topic 4.8 - Error Tracking, in the learning hub 
const Tracing = require('@sentry/tracing'); // Tracing required for sentry 
const bodyParser = require("body-parser");
const session = require('express-session');
const routes = require('./routes');

Sentry.init({                 // code required for sentry (error tracking)
    dsn: "https://df3e3800fa8648b3bfc0c2e2bf19b72a@o1354822.ingest.sentry.io/6638753",  
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

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

app.use(Sentry.Handlers.requestHandler()); //Handlers for sentry (error tracking)
app.use(Sentry.Handlers.tracingHandler()); //Handlers for sentry (error tracking)
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

app.set("view engine", "pug");

app.use(routes);

app.use(Sentry.Handlers.errorHandler()); //error handler necessary for Sentry

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port 3000...`);
});

module.exports = app;