const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const port = process.env.PORT || 3800;
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send(`<h1>Hey Poke fans</h1>`);
});

app.listen(port, () =>
  console.log(`Hey pokedex server is on at port: ${port} `)
);
