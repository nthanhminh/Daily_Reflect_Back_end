'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Entry.init({
    // entryId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    content: DataTypes.STRING,
    moodId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Entry',
    timestamps: false,
  });
  return Entry;
};