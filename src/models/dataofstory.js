'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataOfStory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DataOfStory.belongsTo(models.Story, {foreignKey: 'storyId'})
    }
  }
  DataOfStory.init({
    // id: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER,
    data: DataTypes.BLOB,
    dataType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DataOfStory',
    timestamps: false,
  });
  return DataOfStory;
};