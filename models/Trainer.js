const mongoose = require("mongoose");
const TrainerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  favPokemon: {
    type: String,
  },
  goTeam: {
    type: String,
  },
  email: {
    type: String,

    unique: true,
  },
  password: {
    type: String,
  },
  aboutMe: String,
});

const Trainer = mongoose.model("Trainer", TrainerSchema);

module.exports = Trainer;
