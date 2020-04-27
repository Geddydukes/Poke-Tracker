const mongoose = require("mongoose");
const TrainerSchema = new mongoose.Schema({
  trainerName: String,
  favPokemon: {
    type: String,
  },
  goTeam: {
    type: String,
  },
  aboutMe: String,
  pokemon: [String],
});

const Trainer = mongoose.model("Trainer", TrainerSchema);

module.exports = Trainer;
