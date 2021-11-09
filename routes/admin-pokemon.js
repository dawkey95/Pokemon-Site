//Required Modules Imported
const { application } = require("express");
const express = require("express");
const pokemonDb = require("../modules/pokemon-db.js");
const upload = require("../modules/multer-uploader.js");
const makeArrayModule = require("../modules/make-array.js");
const fs = require("fs");

//Express Router
const router = express.Router();

//Route Handlers
router.get("/admin", function(req, res){
    const allPokemon = pokemonDb.getAllPokemon();

    res.locals.pokemonArray = allPokemon;
    res.render("admin");    //responds a rendered view of the admin.handlebar
});

router.get("/newPokemon", function(req, res) {
    res.render("new-pokemon-form");
});

router.post("/newPokemon", upload.single("imageFile"), function(req, res) { 
    const fileInfo = req.file;

    // Moves the file somewhere more sensible
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/pokemon/${fileInfo .originalname}`;
    fs.renameSync( oldFileName , newFileName );

    // console.log("This retrieved module: " + makeArrayModule(req.body.types));

    //Creates the Object to store information that will be used when we call the savePokemonData function
    const newPokemonData = {
        id: req.body.id,
        name: req.body.name,
        types: makeArrayModule(req.body.types),
        description: req.body.description,
        imageUrl: req.file.originalname
    }
    //console.log("This is newPokemonData stringified: " + JSON.stringify(newPokemonData));

    //Turn the req.body.types into an array which can be used by the addPokemon function
    //Pokemon data is saved to be called into the admin view and client-side randomize button and More Info button
    const typesArray = makeArrayModule(newPokemonData.types);
    const saveNewPokemon = pokemonDb.addPokemon(newPokemonData);

    res.redirect("./admin");
});

// Export the router so we can access it from other JS files using require()
module.exports = router;