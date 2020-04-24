const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const port = process.env.PORT || 3800;
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const app = express();

const authController = require("./controllers/authController");
const trainerController = require("./controllers/trainerController");

const db = require("./models");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/auth", authController);
app.use("/trainer", trainerController);

app.listen(port, () =>
  console.log(`Hey pokedex server is on at port: ${port} `)
);
