# sequelizedBurger 
GitHub: 
https://github.com/FionaHM/sequelizedBurger

## About this application

This application allows a user to enter the name of a burger and then devour it. The user can also delete a devoured burger.  Please not that the total number of displayed burgers is limited to 10. Burgers are added to the devoured and burgers list with the newest on top.  The burger ids will not therefore be sequesential as the list is based on timestamp desc.

## Usage
The application is started on the commandline as follows:
######`> node server.js`

This will bring run a server instance listening on port 8080 locally or whatever port is used by the local environment.

```>The application is structured as follows:

![Image of screen1.png]
(readme_images/screen1.png)


```> The data in this application is persistent, it is stored in a mysql database. It will not be lost when the server is restarted. 

#  Files

## Application Entry:

### server.js 

This is the server side process. It is a node application, specifically express.js.  When this file is started up on the command line it starts an express.js server that listens on a predefined port for client connections. It then routes the connections based on the configuration data set in the controllers/burgers_controller.js file.  This server file also contains middleware information, in the form of the library body-parser, that parses incoming data to the required format.

###  controller/burgers_controller.js

This contains routing information for incoming url.


* POST requests are routed as follows: 
The path "/" is routed to a post method in this controller file. This then uses sequelize ORM to add a new burger to the database.
			
* PUT requests are routed as follows:
The path "/:id" is routed to a put method in this controller file. This then uses sequelize ORM to update the burger in the database.  The id of the item to be updated is captured from the url as a parameter.

* DELETE requests are routed as follows:
The path "/:id" is routed to a delete method in this controller file. This then uses sequelize ORM to delete the burger in the database. The id of the item to be updated is captured from the url as a parameter.


* GET:
A get request is set to serve the base url '/'.  The homepage is populated with the burger data from the database by using sequelize ORM to query the burgers table in the database.  The results of this call are redendered to the page used in the index.handlebars view.


##   Data: 

###  config.json

This file contains connection information for the mysql database.

###  models directory

This directory contains the data models. In this case it contains a burger.js file that contains the schema for the burgers table.

It also contains the index.js file that amoung other things, sets the database environment and exports Sequelize library and the connection to the database.

###  schema.sql

* This file should be run before the server is started to create the underlying database schema. In this case it only contains a command to create the database.


 ![Image of db_creation.png]
(readme_images/db_creation.png)

##   Views: 

* main.handlebars - this is the default template  and it lives in the views/layouts directory.

* index.handlebars - this is the main page and it is referenced by the  main.handlebars template. It lives in the views directory.


##   Other:

* node_modules                -	folder that contains relevant node modules
* package.json                - 	created when command ‘npm init’ is run.  Can be modified manually to include dependencies data or automatically when ‘npm install <library> --save’ is run e.g. ‘npm install inquirer --save’
* README.md                   - 	this file containing relevant operational information.


##  Integration with other libraries

The following libraries were used and those that are not native to node should be included in package.json.

### package.json should include:

#####`"dependencies": {`
#####`"inquirer": "^2.0.0"`
#####`}`


### body-parser

This library parses incoming request bodies in a middleware, available under the req.body property. Contains modules for JSON, text and URL encoded form.

### express

This is a web framework for node.js.

### express-handlebars
A Handlebars view engine for Express.

### method-override
Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

### mysql  
A node.js driver for mysql. 



#  License
FriendFinder is released under the MIT license.
>>>>>>> initial commit
