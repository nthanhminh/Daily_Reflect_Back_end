'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataOfPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DataOfPost.belongsTo(models.Post, {foreignKey: 'postId'})
    }
  }
  DataOfPost.init({
    // id: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    data: DataTypes.BLOB,
    dataType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DataOfPost',
    timestamps: false,
  });
  return DataOfPost;
};