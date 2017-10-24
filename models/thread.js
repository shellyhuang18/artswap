//ENUM DEFINITION
//====================================================
var difficulty = {
    BEGINNER: { value: 1, name: "Beginner" },
    INTERMEDIATE: { value: 2, name: "Intermediate" },
    PROFESSIONAL: { value: 3, name: "Professional" }
};

var purpose = {
    COLLAB: { value: 1, name: "Collaberation" },
    HIRE: { value: 2, name: "Hiring" }
}
//====================================================

module.exports = (sequelize, DataTypes) => {
    var Thread = sequelize.define('Thread', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        difficulty: DataTypes.difficulty,
        purpose: DataTypes.purpose
    });
    Thread.associate = (models) => {
        //associate thread to user currently logged in 
        models.Thread.belongsTo(models.User);
    }
    return Thread;
};