var express = require("express");
var app = express();
var path = require("path");
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(path.join(__dirname, "/assets"));
app.use(express.static(path.join(__dirname, "/assets")));

// Routes
// =============================================================
require("./controller/kindeReadyControl.js")(app);

require("./controller/shapesandcontrol.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});



