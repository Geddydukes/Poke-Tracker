const express = require("express");
const router = express.Router();

const db = require("../models/index");

router.get("/", (req, res) => {
  res.render("trainer/show")
});

router.get("/:id", async (req, res) => {
  try {
    const foundTrainer = await db.Trainer.findById(req.params.id).populate(
      "pokemon"
    );
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
