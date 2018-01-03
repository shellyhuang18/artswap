module.exports = (sequelize, DataTypes) => {
    var Contributors = sequelize.define('Contributors', {
        ThreadId:{
            allowNull: false,
            type: DataTypes.INTEGER
        },
        threadTitle:{
            allowNull: false,
            type: DataTypes.STRING
        },
        UserId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        userName: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });

    return Contributors;
};