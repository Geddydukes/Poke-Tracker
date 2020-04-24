const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi me bane");
});

router.get("/show", (req, res) => {
  res.render;
});

module.exports = router;
