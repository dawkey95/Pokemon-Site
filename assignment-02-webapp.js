// Setup Express
const express = require("express");
const app = express();
const port = 3000;

const dataBase = require("./modules/pokemon-db");

// Setup Handlebars
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Setup body-parser
app.use(express.urlencoded({ extended: false}));

// Make the "public" folder available statically
app.use(express.static("public"));

// When navigating to "/", show the homepage.
app.get("/", function (req, res) {
    res.render("server-info");
});

// TODO Add the web-service.js router here.
const webServicePokemon = require("./routes/web-service");
app.use(webServicePokemon);

// TODO Add your Task Two router here.
const adminPokemon = require("./routes/admin-pokemon");
app.use(adminPokemon);

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`);
});