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
			allowNull: false
		},
		devoured: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: 0
		},
		createdAt: {
			type: DataTypes.DATE,
		    allowNull: false,
		    defaultValue: DataTypes.NOW
		},
		updatedAt: {
		    allowNull: false,
		    type: DataTypes.DATE,
		    defaultValue: DataTypes.NOW
		}
	},{
  		timestamps: false
	})
	// Syncs with DB
	Burger.sync();

	return Burger;
};

