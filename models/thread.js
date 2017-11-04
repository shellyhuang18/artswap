module.exports = (sequelize, DataTypes) => {
    var Thread = sequelize.define('Thread', {
        title: {
            allownNull: false,
            type: DataTypes.STRING
        },
        description: {
            allownNull: false,
            type: DataTypes.TEXT
        },
        difficulty: {
            allownNull: false,
            type: DataTypes.ENUM,
            values: ['Beginner', 'Intermediate', 'Professional']
        },
        purpose: {
            allownNull: false,
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