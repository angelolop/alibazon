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

app.get("/", async (req, res) => {   
  const query = await axios.get("https://randomuser.me/api/?results=9");
  res.render("index", { users: {results: [
                                          {                       
                                          name: "angelo", //Little JSON provided by me, i will change for the API from OSF
                                          }]
                                          }});
});

app.use(Sentry.Handlers.errorHandler()); //error handler necessary for Sentry

app.listen(3000, () => {
  console.log(`Listening on port 3000...`);
});