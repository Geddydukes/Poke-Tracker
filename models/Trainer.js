const mongoose = require("mongoose");
const TrainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  aboutMe: String,
});

const Trainer = mongoose.model("Trainer", TrainerSchema);

module.exports = Trainer;
