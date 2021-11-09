/**
 * This module contains methods for reading and writing data contained within the pokemon-db.json and type-data-db.json files.
 */

const fs = require("fs");

// Loads and returns all type data from the file.
function loadTypeData() {
    const jsonString = fs.readFileSync("./data/type-data-db.json", "utf-8");
    return JSON.parse(jsonString);
}

// Loads and returns all Poke'mon data from the file.
function loadPokemonData() {
    const jsonString = fs.readFileSync("./data/pokemon-db.json", "utf-8");
    return JSON.parse(jsonString);
}

// Saves the given Poke'mon data to the file.
function savePokemonData(pokemonData) {
    const jsonString = JSON.stringify(pokemonData);
    fs.writeFileSync("./data/pokemon-db.json", jsonString);
}

// This code will validate the supplied Poke'mon. If anything invalid is found,
// an exception will be thrown. Otherwise, a new object with exactly the correct
// properties is returned.
function validatePokemon(pokemon) {
    if (!pokemon.name) {
        throw "Supplied Poke'mon has no name!";
    }
    if (!pokemon.imageUrl) {
        throw "Supplied Poke'mon has no imageUrl!";
    }
    if (!pokemon.description) {
        throw "Supplied Poke'mon has no description!";
    }
    if (pokemon.types === undefined) {
        throw "Supplied Poke'mon has undefined types!";
    }
    if (!Array.isArray(pokemon.types)) {
        throw "Supplied Poke'mon's types aren't an array!";
    }
    if (isNaN(pokemon.id)) {
        throw "Supplied Poke'mon's id is not a number!";
    }

    return {
        id: pokemon.id,
        name: pokemon.name,
        imageUrl: pokemon.imageUrl,
        description: pokemon.description,
        types: pokemon.types,
    }
}

// Load the pokemon data initially.
const pokemonData = loadPokemonData();
const typeData = loadTypeData();

// Gets the number of Poke'mon.
function getNumPokemon() {
    return pokemonData.length;
}

// Gets all Poke'mon data.
function getAllPokemon() {
    return [...pokemonData]; // Returns a copy of the array.
}

// Gets the Poke'mon with the given id. See the JavaScript documentation for the Array find() function for details.
function getPokemonById(id) {
    return pokemonData.find(function(pokemon) {
        return pokemon.id == id;
    });
}

// Gets the Poke'mon at the given array index.
function getPokemonByArrayIndex(index) {
    return pokemonData[index];
}

// Adds the given pokemon to the list, sorts it by id, and then saves the list back to the file.
function addPokemon(pokemon) {

    // This code will validate the supplied Poke'mon. If anything invalid is found,
    // an exception will be thrown.
    pokemon = validatePokemon(pokemon);

    pokemonData.push(pokemon);
    pokemonData.sort(function(p1, p2) {
        return p1.id - p2.id;
    });
    savePokemonData(pokemonData);
}

// Gets the type data that was contained within the file
function getTypeData() {
    return typeData;
}

// Export the following functions so they can be accessed outside of this file by
// using require().
module.exports = {
    getNumPokemon,
    getAllPokemon,
    getPokemonById,
    getPokemonByArrayIndex,
    getTypeData,
    addPokemon
};