const express = require("express");
const axios = require("axios");
const app = express();
const Sentry = require('@sentry/node'); // Error tracking mandatory, observed in topic 4.8 - Error Tracking, in the learning hub 
const Tracing = require('@sentry/tracing'); // Tracing required for sentry 

Sentry.init({                 // code required for sentry (error tracking)
  dsn: "https://df3e3800fa8648b3bfc0c2e2bf19b72a@o1354822.ingest.sentry.io/6638753",  
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler()); //Handlers for sentry (error tracking)
app.use(Sentry.Handlers.tracingHandler()); //Handlers for sentry (error tracking)

app.set("view engine", "pug");

app.get("/", async (req, res) => {   //API da OSF ainda vou implementar as rotas
  const query = await axios.get("https://backend-academy-osf.herokuapp.com/api/products/product_search", {
    params: {
      id: 25565189,
      secretKey: "$2a$08$p3my8MGizWp3L8f6sn0PCO2c4mLv.mewFcpcfy8pGxHFi0iT4cUX."
    }
  })
  res.render("index", console.dir(query));
});

app.use(Sentry.Handlers.errorHandler()); //error handler necessary for Sentry

app.listen(3000, () => {
  console.log(`Listening on port 3000...`);
});