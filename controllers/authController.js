const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const db = require("../models");

router.get("/register", (req, res) => {
  res.render("/auth");
});
