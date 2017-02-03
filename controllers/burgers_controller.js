var exprhbs = require('express-handlebars'); 
var methodOverride = require("method-override");
var db = require('../models');


// Relationships
// one to many 
// db.Customer.hasMany(db.Burger); 
  

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
		var customerName = req.body.customername.toUpperCase();
		// find the customer in the Customers table or create if it does not exist
 	    db.Customer.findOrCreate({
 	    	where: {customer_name: customerName}
	    }).then(function(data){
	    	// add the burger data for the current customer
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

	// // this put command updates customer in the database based on id field
	app.put("/:id", function (req, res) {
		// id is captured from the url as a parameter
		var burgerId = req.params.id;	
		// customer name captured from the request body
		var customerName = req.body.customer_name.toUpperCase(); 
		// get or create an id for this customer - then update the burger table
		db.Customer.findOrCreate({
 	    	where: {customer_name: customerName}
	    }).then(function(data){
	    	// use captured id to update the Burger table
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

	// // this delete command removes an item from the database table Burger based on id
	app.delete("/:id", function (req, res) {
		// id is captured from the url as a parameter
		var burgerId = req.params.id;
		// this is the sequelize delet command
		db.Burger.destroy(
			{where : { id : burgerId }}
		).then(function(){
			// reloads homepage
			res.redirect("/");	
		})

	})

	// populate data on the main page
	app.get('/', function(req, res){
		// find all the burgers, devoured and not devoured
		db.Burger.findAll({
			order: [
				// order by burger_name from A-Z ascending
			    ['burger_name', 'ASC']],
				limit: 10, 
				include: [db.Customer]
			})
	        .then(function(rows) {
				var resultsObj = sortBurgers(rows);
				return resultsObj;
	        })
	        .then(function(resultsObj){
	        	// call function to get count of burgers devoured
	        	// this function returns a promise
				glutton().then(function(rows){
					resultsObj.glutton = rows
				}).then(function(){
					// send results in an object format
					res.render('index', {resultsObj: resultsObj});
				})
	        })
	})

	function glutton(){
		return new Promise(function(resolve, reject){
			// if burgers have been devoured then see who has eaten the most
    		// the sequelize command works but it only returns the BurgerCount and not the customer_name eventhough it is an attribute
			// in the query
			// db.Customer.findAll({
			// 	attributes: ['Customer.customer_name', [db.sequelize.fn('COUNT', 'db.Burger.customer_id'), 'BurgerCount']],
			// 	include: [{model: db.Burger, attributes : [], all: false , nested: true }],
			// 	group: ['Customer.customer_name','Customer.id' ],
			// 	// order: [[(db.sequelize.fn('COUNT', 'db.Burger.customer_id')),'DESC']]
			// SO I decided to use the raw query function instead as I was unable to do what i wanted with FindAll
			db.sequelize.query(
				"SELECT Customer.customer_name, count(Burger.customer_id) AS likecount FROM Customers AS Customer, Burgers AS Burger where Customer.id = Burger.customer_id and Burger.devoured = 1 GROUP BY Customer.customer_name HAVING (likecount > 0) ORDER BY likecount DESC limit 1", { type: db.sequelize.QueryTypes.SELECT
			})
			.then(function(rows){
				resolve(rows);
			})
	        // Note to self: in order to exclude Burger and Customer primary keys from query need to
	        // use  attributes : [] on the include. Otherwise aggregration wont happen.
		}).catch(function(err){

			reject(err);
		})
	}

	function sortBurgers(rows){

		var burgerArr = [];
		var devouredArr = [];
		// store this data in the appropriate array 
		for (var i = 0; i < rows.length; i++){
			if (rows[i].devoured === false){
				burgerArr.push(rows[i]);
			} else {
				devouredArr.push(rows[i])
			}
		}
		// create 2 booleans to indicate the status of the data
		// one for the burgers list - false if no burgers
		var noBurgers = false;
		if (burgerArr.length === 0){
			noBurgers = true;
		}
		// one for the devoured list - false if nothing devoured
		var noDevouredBurgers = false;
		if (devouredArr.length === 0){
			noDevouredBurgers = true;
		}
		// create object to send back to index page
		var resultsObj = {
			burgers: burgerArr, 
			noBurgers: noBurgers,
			devoured: devouredArr,
			noDevoured: noDevouredBurgers,
			glutton: []
		}
		return resultsObj;

	}
}

module.exports = router;