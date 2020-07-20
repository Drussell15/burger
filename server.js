
// Dependencies
// =============================================================
const express = require("express");

// Sets up the Express App
// =============================================================
const PORT = process.env.PORT || 8080;

const app = express();

// Static directory to be served
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//set handlebars.
const exphbs= require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
const routes = require("./controllers/burgers_controller");

app.use(routes);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
