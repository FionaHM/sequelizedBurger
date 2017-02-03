module.exports = function(sequelize, DataTypes){
	var Customer = sequelize.define("Customer", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		customer_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {len: [1, 33], notEmpty: true }
		}
	},{  // use snake case instead of camel case so foreign keys of format modelname_pkid e.g. burger_id or customer_id
    	underscored: true,
    	classMethods: {
        associate: function(models) {
           // One to many relationship
			// When a Customer is deleted, also delete any associated Burgers
			Customer.hasMany(models.Burger, {
				onDelete: "cascade"
			});
        }
      }
  	},{
  		timestamps: false
	} )
	// Syncs with DB
	// Customer.sync();

	return Customer;
};

