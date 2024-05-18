'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Friend.belongsTo(models.User, {foreignKey: 'userId'})
      Friend.belongsTo(models.User, {foreignKey: 'anotherUserId'})
    }
  }
  Friend.init({
    // id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    anotherUserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Friend',
    timestamps: false,
  });
  return Friend;
};