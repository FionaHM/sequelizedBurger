module.exports = function(sequelize, DataTypes){
	var Burger = sequelize.define("Burger", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		burger_name: {
			type: DataTypes.STRING,
			// allowNu÷ll: false,
			validate: {len: [1, 33], notEmpty: true }
		},
		devoured: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: 0
		},
	},{  // use snake case instead of camel case so foreign keys of format modelname_pkid e.g. burger_id or customer_id
    	underscored: true,
    	classMethods: {
        associate: function(models) {
       		// many to one relationship Burgers to Customer 
          	// An Customer (foreignKey) is required or a Burger can't be added
        	Burger.belongsTo(models.Customer, {
	            foreignKey: {
	              allowNull: false
	            }
          	});
        }
      }
  	},{
  		timestamps: false
	})

	// Syncs with DB
	// Burger.sync();

	return Burger;
};

