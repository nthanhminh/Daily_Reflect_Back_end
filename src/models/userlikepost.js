'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLikePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserLikePost.belongsTo(models.User, {foreignKey: 'userId'});
      UserLikePost.belongsTo(models.Post, {foreignKey: 'postId'});
    }
  }
  UserLikePost.init({
    // id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserLikePost',
    timestamps: false,
  });
  return UserLikePost;
};