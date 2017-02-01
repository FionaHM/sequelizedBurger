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
		customer_id: {
			type: DataTypes.INTEGER,
			defaultValue: -1,
		},
		// who_devoured_id: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true
		// },
		created_at: {
			type: DataTypes.DATE,
		    allowNull: false,
		    defaultValue: DataTypes.NOW
		},
		updated_at: {
		    allowNull: false,
		    type: DataTypes.DATE,
		    defaultValue: DataTypes.NOW
		}
	},{  // use snake case instead of camel case so foreign keys of format modelname_pkid e.g. burger_id or customer_id
    	underscored: true
  	},{
  		timestamps: false
	})

	// Syncs with DB
	Burger.sync();

	return Burger;
};

