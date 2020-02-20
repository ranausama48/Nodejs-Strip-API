const express = require("express");
const strip = require("strip")("sk_test_ukvFpVbsTfID1wk0zZDyxLdV00x7ZrGX6G");
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
