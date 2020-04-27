const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // const allPokemon = await P.getPokemonsList();
    const kantoPokemon = await P.getPokedexByName("kanto");
    const johtoPokemon = await P.getPokedexByName("Johto");
    // const hoennPokemon = await P.getPokedexByName("hoenn");
    // console.log(allPokemon);
    // res.send(allPokemon);
    res.render("pokemon/index", {
      kantoPokemon: kantoPokemon,
      johtoPokemon: johtoPokemon,
      hoennPokemon: hoennPokemon,
    });
  } catch (err) {
    return res.send(err);
  }
});

router.get("/:name", async (req, res) => {
  try {
    const foundPokemon = await P.getPokemonByName(`${req.params.name}`);
    // console.log(foundPokemon);
    res.render("pokemon/show", {
      pokemon: foundPokemon,
    });
  } catch (err) {
    // console.log(err);
    return res.send(err);
  }
});

module.exports = router;
