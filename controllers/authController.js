const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const db = require("../models/index");

router.get("/register", (req, res) => {
  res.render("auth/register", {

  });
});

router.post("/register", async (req, res) => {
  try {
    const trainer = await db.Trainer.findone({ name: req.body.name });
    if (trainer) {
      return res.send("<h1>Account exists<h1>");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const trainerData = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      aboutMe: req.body.aboutMe,
    };
    await db.Trainer.create(trainerData);
    res.redirect("/auth/login");

  } catch (err) {
    return res.send(err);
  }
});

router.get("/login", (req, res) => {
  //   res.render("auth/login");
  res.render("auth/login")
});

router.post("/login", async (req, res) => {
  try {
    const trainer = await db.Trainer.findone({ name: req.body.name });
    if (!trainer) {
      return res.render("auth/login", {
        error: "Invalid Login Credentials",
      });
    }
    const passwordsMatch = bcrypt.compareSync(
      req.body.password,
      trainer.password
    );
    if (!passwordsMatch) {
      return res.render("auth/login", {
        error: "Invalid Login Credentials",
      });
    }
    res.redirect("/trainer");
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
