const express = require("express");
const routes = require("./routes");
const session = require("express-session");
const { oAuth2Client, SCOPES } = require("../src/utils");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", async (req, res) => {
  res.json({ "working in port": process.env.PORT });
});

app.get("/auth", (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    state: req.session.redirectTo,
  });
  res.redirect(url);
});

app.get("/oauth2callback", async (req, res) => {
  const { code, state } = req.query;
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    req.session.tokens = tokens;
    const redirectUrl = new URL(
      " https://email-classifications-gpt.vercel.app/emails"
    ); // deployed url
    // const redirectUrl = new URL("http://localhost:4000/emails"); // local URL
    redirectUrl.searchParams.set("accessToken", tokens.access_token);
    res.redirect(redirectUrl.toString());
  } catch (error) {
    res.status(500).send("Authentication failed");
  }
});

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("Listening on port ", +process.env.PORT);
});
