module.exports = (sequelize, DataTypes) => {
    var Contributors = sequelize.define('Contributors', {
        ThreadId:{
            allowNull: false,
            type: DataTypes.INTEGER
        },
        UserId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        userName: {
            allowNull: true,
            type: DataTypes.STRING
        }
    });

    return Contributors;
};