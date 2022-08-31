const express = require("express");
const app = express();
const Sentry = require('@sentry/node'); 
const Tracing = require('@sentry/tracing'); 
const session = require('express-session');
const YAML = require ('yamljs');
const swaggerJsDocs = YAML.load('./alibazon.yaml');
const swaggerUI = require('swagger-ui-express');
const methodOverride = require('method-override');

Sentry.init({                 
    dsn: "https://df3e3800fa8648b3bfc0c2e2bf19b72a@o1354822.ingest.sentry.io/6638753",  
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use('/alibazon-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.use(session({            
    secret: 'alibazon secret',
    resave: true,
    saveUninitialized: false
}));

app.use(function (req, res, next) {     
    res.locals.currentUser = req.session.userId;
    next();
});

app.use(methodOverride('_method'));

require("./routes/startup.routes")(app);

app.use(Sentry.Handlers.requestHandler()); 
app.use(Sentry.Handlers.tracingHandler()); 
app.use(express.static('public'));
app.use(Sentry.Handlers.errorHandler()); 

app.set("view engine", "pug");

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port 3000...`);
});

module.exports = app;