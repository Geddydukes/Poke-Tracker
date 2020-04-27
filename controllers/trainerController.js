const express = require("express");
const router = express.Router();

const db = require("../models/index");

router.get("/", (req, res) => {
  if (!req.session.currentUser) {
    // if no currentuser cookie no access
    return res.redirect("/auth/login");
  }
  res.render("trainer/index");
});

router.get("/new", (req, res) => {
  if (!req.session.currentUser) {
    // if no currentuser cookie no access
    return res.redirect("/auth/login");
  }
  res.render("trainer/new");
});

router.post("/index", async (req, res) => {
  if (!req.session.currentUser) {
    // if no currentuser cookie no access
    return res.redirect("/auth/login");
  }
  const newTrainer = db.Trainer.create(req.body);
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
    res.render("trainer/edits", {
      trainer: foundTrainer,
    });
  } catch (err) {
    return res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const foundTrainer = await db.Trainer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      res.redirect(`/trainers/${req.params.id}`)
    );
  } catch (err) {
    return res.send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.Trainer.findByIdAndDelete(req.params.id);
  } catch (error) {
    return res.send(err);
  }
});

module.exports = router;
