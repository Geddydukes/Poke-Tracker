const mongoose = require("mongoose");
const PokemonSchema = new mongoose.Schema({
  name: String,
  id: Number,
  moves: [],
  types: [],
  sprites: URL,
  height: String,
  weight: String,
});

const Pokemon = mongoose.model("Pokemon", PokemonSchema);

module.exports = Pokemon;
