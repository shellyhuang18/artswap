module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    body: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      }
    },
    creator: {
      type: DataTypes.STRING
    },
    highlighted:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  Post.associate = (models) => {
    models.Post.belongsTo(models.Thread);
    models.Post.belongsTo(models.User);
  }
  return Post;
};
