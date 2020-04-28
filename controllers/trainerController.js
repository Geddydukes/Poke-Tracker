const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const express = require("express");
const router = express.Router();

const db = require("../models/index");

router.get("/", (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }
  res.render("trainer/index");
});

router.get("/new", (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }
  res.render("trainer/new");
});

router.post("/", async (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }
  try {
    const trainerData = {
      trainerName: req.body.trainerName,
      favPokemon: req.body.favPokemon,
      goTeam: req.body.goTeam,
      user: req.session.currentUser,
      aboutMe: req.body.aboutMe,
    };
    const newTrainer = await db.Trainer.create(trainerData);
    const foundUser = await db.User.findById(req.session.currentUser);
    console.log(newTrainer);
    console.log(foundUser);
    await foundUser.trainers.push(newTrainer._id);
    foundUser.save();

    res.redirect("/pokemon");
  } catch (err) {
    return res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const foundTrainer = await db.Trainer.findById(req.params.id);
    res.render("trainer/show", {
      trainer: foundTrainer,
    });
  } catch (err) {
    return res.send(err);
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const foundTrainer = await db.Trainer.findById(req.params.id);
    if (req.session.currentUser !== foundTrainer.user) {
      return res.redirect("/auth/login");
    }
    res.render("trainer/edits", {
      trainer: foundTrainer,
    });
  } catch (err) {
    return res.send(err);
  }
});

router.get("/:id/add", async (req, res) => {
  try {
    const interval = {
      limit: 793,
      offset: 1,
    };
    const allPokemon = await P.getPokemonsList(interval);
    const foundTrainer = await db.Trainer.findById(req.params.id);
    // if (req.session.currentUser !== foundTrainer.user) {
    //   return res.redirect("/auth/login");
    // }
    res.render("trainer/add", {
      trainer: foundTrainer,
      pokemon: allPokemon,
    });
  } catch (err) {
    return res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  // if (!req.session.currentUser) {
  //   return res.redirect("/auth/login");
  // }
  console.log(req);
  try {
    const foundTrainer = await db.Trainer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      res.redirect(`/trainer/${req.params.id}`)
    );
  } catch (err) {
    return res.send(err);
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }
  try {
    const deletedTrainer = await db.Trainer.findByIdAndDelete(req.params.id);
    const foundUser = await db.User.findById(deletedTrainer.user);
    foundUser.trainers.remove(deletedTrainer);
    foundUser.save();
  } catch (error) {
    return res.send(err);
  }
});

module.exports = router;
