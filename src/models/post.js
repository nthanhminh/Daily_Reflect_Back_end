'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {foreignKey: 'userId'});
      Post.hasMany(models.DataOfPost, { foreignKey: 'postId' }); // Thêm dòng này
      Post.hasMany(models.UserLikePost, { foreignKey: 'postId' }); // Thêm dòng này
    }
  }
  Post.init({
    userId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    content: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
    timestamps: false,
  });
  return Post;
};