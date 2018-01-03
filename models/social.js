module.exports = (sequelize, DataTypes) => {
    var Social = sequelize.define('Social', {
        userName: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isAlphanumeric: true,
                notEmpty: true,
            },
            unique: true,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            validate:{
                notEmpty: true,
            },
            unique: true,
        },
        facebook: {
            type: DataTypes.STRING,
        },
        twitter: {
            type: DataTypes.STRING,
        },
        deviantart: {
            type: DataTypes.STRING,
        },
        github: {
            type: DataTypes.STRING,
        },
        website: { //User's personal website
            type: DataTypes.STRING,
        },
    });
    //No associations
    return Social;
};