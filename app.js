const express = require("express");
const stripe = require("stripe")("place your strip secret key");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();

// Handlebar MidleWare
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Midelware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set The Static Folder

app.use(express.static(`${__dirname}/public`));

// index Route
app.get("/", (req, res) => {
  res.render("index");
});

// charge Route
app.post("/charge", (req, res) => {
  const amount = 2500;
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "Description About Product you want to Sale",
        currency: "usd",
        customer: customer.id
      })
    )
    .then(charge => res.render("success"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
