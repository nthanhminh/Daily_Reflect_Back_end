'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {foreignKey: 'userId'})
      User.hasMany(models.Story, {foreignKey: 'storyId'})
      User.hasMany(models.Friend, {foreignKey: 'userId'})
      User.hasMany(models.Friend, {foreignKey: 'anotherUserId'})
      User.hasMany(models.InviteCode, {foreignKey: 'userId'})
      User.hasMany(models.UserLikePost, {foreignKey: 'userId'})
      User.hasMany(models.UserSetSticker, {foreignKey: 'userId'})
      User.hasMany(models.UserWriteEntry, {foreignKey: 'userId'})
    }
  }
  User.init({
    // userId: DataTypes.INTEGER,
    password: DataTypes.STRING,
    backgroundId: DataTypes.INTEGER,
    welcomeSongId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    userName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
  });
  return User;
};