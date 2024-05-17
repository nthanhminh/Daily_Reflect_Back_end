'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWriteEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserWriteEntry.init({
    // id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    entryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserWriteEntry',
    timestamps: false,
  });
  return UserWriteEntry;
};