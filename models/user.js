const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {

    var User = sequelize.define('User', {
        userName: {
        	allowNull: false,
        	type: DataTypes.STRING,
        	validate: {
        		isAlphanumeric: true
        	}
        },
        firstName: {
        	allowNull: false,
        	type: DataTypes.STRING
        },
        lastName: {
        	allowNull: false,
        	type: DataTypes.STRING
        },
        password: {
        	allowNull: false,
        	type: DataTypes.VIRTUAL
        },
        email: {
        	allowNull: false,
        	type: DataTypes.STRING
        }
    });
    return User;
}

