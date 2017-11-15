module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    threadID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING,
    }
  });

  Post.associate = (models) => {
    models.Post.belongsTo(models.User);
    models.Post.belongsTo(models.Thread);
  }

  return Post;
};
