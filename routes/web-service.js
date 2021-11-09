// Importing required modules
const { application } = require("express");
const express = require("express");
const pokemonDb = require("../modules/pokemon-db.js");

// Setup an express Router
const router = express.Router();

// TODO Add your route handlers here

router.get("/services/pokemon", function(req, res){
    const pokemonID = req.query.id;
    const idNumber = parseInt(pokemonID);
    const pokemon = pokemonDb.getPokemonById(idNumber)
    res.json(pokemon);
    //console.log(pokemon);
});

router.get("/services/pokemon/types", function(req, res) {
    const typeData = pokemonDb.getTypeData();
    res.json(typeData);
    //console.log(typeData);
});

//router module to /path
//gets number of pokemon in array
//gets random number between 0 and max length of array
//gets random Pokemon by array index number
//responds as json.
router.get("/services/pokemon/random", function(req, res) {
    const pokemonLength = pokemonDb.getNumPokemon();
    //console.log(pokemonLength);
    const randomNum = Math.floor(Math.random() * pokemonLength);
    const randomPokemon = pokemonDb.getPokemonByArrayIndex(randomNum);
    res.json(randomPokemon);
    //console.log(randomPokemon);
});

// Export the router so we can access it from other JS files using require()
module.exports = router;