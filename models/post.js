module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  });

  Post.associate = (models) => {
    models.Post.belongsTo(models.User);
    models.Post.belongsTo(models.Thread);
  }

  return Post;
};
