const express = require("express");
const axios = require("axios");
const app = express();
const Sentry = require('@sentry/node'); // Error tracking mandatory, observed in topic 4.8 - Error Tracking, in the learning hub 
const Tracing = require('@sentry/tracing'); // Tracing required for sentry 
const secretKey = "$2a$08$p3my8MGizWp3L8f6sn0PCO2c4mLv.mewFcpcfy8pGxHFi0iT4cUX."
const apiCategory = "https://backend-academy-osf.herokuapp.com/api/categories/parent/"

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
app.use(express.static('images'));
app.use(express.json());

app.set("view engine", "pug");

app.get("/category/:id", async (req, res) => { 
  let id = req.params.id;  //Route home, for categories
  const query = await axios.get(apiCategory + id, {// Put men or women depending on the request
    params: {
      secretKey: secretKey
    }
  })
  res.render("categories", { cardsOfCategories: query.data, jumbotron: true});
}); 

app.get("/products", async (req, res) => {   //Route for the especified product
  const query = await axios.get("https://backend-academy-osf.herokuapp.com/api/products/product_search?page=1&primary_category_id=womens-clothing-tops", {
    params: {
      secretKey: secretKey
    }
  });
  res.render("products", { cardsOfProducts: query.data, jumbotron: false});
});

app.use(Sentry.Handlers.errorHandler()); //error handler necessary for Sentry

app.listen(3000, () => {
  console.log(`Listening on port 3000...`);
});