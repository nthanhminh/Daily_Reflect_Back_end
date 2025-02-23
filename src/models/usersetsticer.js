'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSetSticker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserSetSticker.belongsTo(models.User, {foreignKey: 'userId'})
      UserSetSticker.belongsTo(models.Sticker, {foreignKey: 'stickerId'})
    }
  }
  UserSetSticker.init({
    // id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    stickerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserSetSticker',
    timestamps: false,
  });
  return UserSetSticker;
};