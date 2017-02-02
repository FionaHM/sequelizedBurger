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
		},
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
	} )
	// Syncs with DB
	// Customer.sync();

	return Customer;
};

