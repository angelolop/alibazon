const express = require("express");
const axios = require("axios");
const app = express();
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

Sentry.init({
  dsn: "https://df3e3800fa8648b3bfc0c2e2bf19b72a@o1354822.ingest.sentry.io/6638753",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.set("view engine", "pug");

app.get("/", async (req, res) => {
  const query = await axios.get();
  res.render("index", { users: query.data.results });
});

app.use(Sentry.Handlers.errorHandler());

app.listen(3000, () => {
  console.log(`Listening on port 3000...`);
});