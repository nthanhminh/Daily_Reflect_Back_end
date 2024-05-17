'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InviteCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InviteCode.init({
    // id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    inviteCode: DataTypes.STRING,
    expiration: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'InviteCode',
    timestamps: false,
  });
  return InviteCode;
};