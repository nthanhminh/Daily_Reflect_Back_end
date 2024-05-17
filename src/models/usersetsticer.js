'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usersetsticker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usersetsticker.init({
    // id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    stickerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usersetsticker',
    timestamps: false,
  });
  return Usersetsticker;
};