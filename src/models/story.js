'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Story.hasOne(models.DataOfStory, {foreignKey: 'storyId'});
      Story.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
  Story.init({
    userId: DataTypes.INTEGER,
    date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Story',
    timestamps: false,
  });
  return Story;
};