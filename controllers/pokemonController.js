const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const interval = {
      limit: 793,
      offset: 1,
    };
    const allPokemon = await P.getPokemonsList(interval);
    // const kantoPokemon = await P.getPokedexByName("kanto");
    // console.log(allPokemon);
    // res.send(allPokemon);
    res.render("pokemon/index", {
      pokemon: allPokemon,
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
