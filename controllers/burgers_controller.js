var exprhbs = require('express-handlebars'); 
var methodOverride = require("method-override");
var db = require('../models');

// I pass the app in as a parameter - this means i dont need to require express above
function router(app){
	// this tells express what template engine to use and the default template lives (main)
	app.engine('handlebars', exprhbs({defaultLayout: 'main'}));
	// this sets the view engine to handlebars
	app.set('view engine', 'handlebars');

	// Override with POST having ?_method=PUT or DELETE
	app.use(methodOverride("_method"));

	// adds a new item to the database
	app.post("/", function (req, res) {
		// capture the name of the burger
		// console.log(req.body.burgername);
		var burgerName = req.body.burgername;
		// add it to the table
	    db.Burger.create({
	      burger_name: burgerName
	    }).then(function(){
	   		// reloads homepage
			res.redirect("/");	
	    }

		)
	})

	// // this put command updates an item in the database 
	app.put("/:id", function (req, res) {
		// id is captured from the url as a parameter
		var burgerId = req.params.id;

		db.Burger.update(
			{devoured: 1}, 
			{where : { id : burgerId }}, 
			{fields: ['devoured']}
		).then(function() {
				res.redirect("/");
		})
	})

	// // this delete command removes an item from the database 
	app.delete("/:id", function (req, res) {
		// id is captured from the url as a parameter
		var burgerId = req.params.id;

		db.Burger.destroy(
			{where : { id : burgerId }}
		).then(function(){
			// reloads homepage
			res.redirect("/");	
		})

	})

	// // app.use this routes the url request to the right page
	// // i decided to put app.use so anything other than a predefined route
	// // will bring up the home page
	// // i found this must be the last route in the list



	app.get('/', function(req, res){

		db.Burger.findAll({
			order: [
		    // Will escape username and validate DESC against a list of valid direction parameters
			    ['createdAt', 'DESC']],
				limit: 10
			})
	        .then(function(rows) {

				var response = sortBurgers(rows);
				// send back both booleans and both arrays
				res.render('index', { burgers: response[0], noBurgers: response[1], devoured: response[2], noDevoured: response[3]});
	
	        });

	})

	function sortBurgers(rows){

		var burgerArr = [];
		var devouredArr = [];
		// store this data in the appropriate array 
		// determine
		for (var i = 0; i < rows.length; i++){
			if (rows[i].devoured === false){
				burgerArr.push(rows[i]);
			} else {
				devouredArr.push(rows[i])
			}
		}
		// create 2 booleans to let the client know if no data available
		// one for the burgers list
		var noBurgers = false;
		if (burgerArr.length === 0){
			noBurgers = true;
		}
		// one for the devoured list
		var noDevouredBurgers = false;
		if (devouredArr.length === 0){
			noDevouredBurgers = true;
		}

		return [burgerArr, noBurgers, devouredArr, noDevouredBurgers];

	}
}

module.exports = router;