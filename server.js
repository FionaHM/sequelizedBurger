var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var PORT = process.env.PORT || 8080;
var app = express();
var router = require('./controllers/burgers_controller.js');
var db = require('./models');
// var burger = require('./models/burger.js');

// Serve static content for the app from the "public" directory in the application directory.
// this goes before any body-parser calls - static files dont need parsing.
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded 
// found urlencoded extended must be true for nested arrays and for post method
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// parse an HTML body into a string 
app.use(bodyParser.text({ type: 'text/html' }));

db.sequelize.sync({force: false}).then(function(){
	router(app);

	app.listen(PORT, function(){
		console.log("listening on port " + PORT);
	});
})
