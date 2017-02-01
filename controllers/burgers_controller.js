var exprhbs = require('express-handlebars'); 
var methodOverride = require("method-override");
var db = require('../models');

// Relationships
// db.Burger.belongsTo(db.Burger, {as: 'who_created'}); 
// db.Customer.hasMany(db.Burger);  // this is the one used for the join for now

// db.Burger.belongsTo(db.Customer, {as: 'who_created'});  
db.Burger.belongsTo(db.Customer);  

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
		var burgerName = req.body.burgername;
		var customerName = req.body.customername.toLowerCase();
		// find the customer in the Customers table or create if it does not exist
 	    db.Customer.findOrCreate({
 	    	where: {customer_name: customerName}
	    }).then(function(data){
    		// console.log(data[0].dataValues.id);
    		db.Burger.create({
    			burger_name: burgerName,
    			customer_id: data[0].dataValues.id
    		}).catch(function(err){
    			console.log(err);
			});
		}).then(function() {
			res.redirect("/");
		}).catch(function(err){
			console.log(err);
			res.redirect("/");
		})
	})

	// // this put command updates an item in the database 
	app.put("/:id", function (req, res) {
		// id is captured from the url as a parameter
		var burgerId = req.params.id;	
		var customerName = req.body.customer_name; 
		// get or create an id for this customer - then update the burger table
		db.Customer.findOrCreate({
 	    	where: {customer_name: customerName}
	    }).then(function(data){

			db.Burger.update(
				{devoured: 1, 
				customer_id: data[0].id }, 
				{where : { id : burgerId }}, 
				{fields: ['devoured', 'customer_id']}
			).catch(function(err){
				console.log(err);
			});
		}).then(function() {
			res.redirect("/");
		}).catch(function(err){
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

	// populate data on the main page
	app.get('/', function(req, res){

		db.Burger.findAll({
			order: [
				// order by burger_name from A-Z ascending
			    ['burger_name', 'ASC']],
				limit: 10, 
				include: [db.Customer]
			})
	        .then(function(rows) {
	       
				var resultsObj = sortBurgers(rows);
				// send results in an object format
				res.render('index', {resultsObj: resultsObj});
	
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
				console.log(rows[i]);
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
		// create object to send back to index page
		var resultsObj = {
			burgers: burgerArr, 
			noBurgers: noBurgers,
			devoured: devouredArr,
			noDevoured: noDevouredBurgers
		}
		return resultsObj;

	}
}

module.exports = router;