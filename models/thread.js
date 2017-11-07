module.exports = (sequelize, DataTypes) => {
    var Thread = sequelize.define('Thread', {
        slug:{
            allowNull: false,
            type: DataTypes.STRING
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        difficulty: {
            allowNull: false,
            type: DataTypes.ENUM,
            values: ['Beginner', 'Intermediate', 'Professional']
        },
        purpose: {
            allowNull: false,
            type: DataTypes.ENUM,
            values: ['Collab', 'Hiring']
        }
    });
    Thread.associate = (models) => {
        //associate thread to user currently logged in 
        models.Thread.belongsTo(models.User);
    }
    return Thread;
};