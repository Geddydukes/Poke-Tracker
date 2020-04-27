const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const db = require("../models/index");

router.get("/register", (req, res) => {
  res.render("auth/register", {});
});

router.post("/register", async (req, res) => {
  try {
    const trainer = await db.Trainer.findOne({ username: req.body.username });
    console.log(req.body);
    if (trainer) {
      return res.send("<h1>Account exists<h1>");
    }
    // TODO fix bcrypt
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(req.body.password, salt);

    const trainerData = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      favPokemon: req.body.favPokemon,
      goTeam: req.body.goTeam,
      email: req.body.email,
      //   password: hash,
      aboutMe: req.body.aboutMe,
    };
    // console.log(trainerData);
    await db.Trainer.create(trainerData);
    res.redirect("/auth/login");
  } catch (err) {
    return console.log(err);
  }
});

router.get("/login", (req, res) => {
  //   res.render("auth/login");
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const trainer = await db.Trainer.findOne({ username: req.body.username });
    if (!trainer) {
      return res.render("auth/login", {
        error: "Invalid Login Credentials",
      });
    }

    // TODO fix bcrypt
    // const passwordsMatch = bcrypt.compareSync(
    //   req.body.password,
    //   trainer.password
    // );
    // if (password!=="1234") {
    //   return res.render("auth/login", {
    //     error: "Invalid Login Credentials",
    //   });
    // }
    res.redirect("/trainer");
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
