const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi me bane");
});

module.exports = router;
