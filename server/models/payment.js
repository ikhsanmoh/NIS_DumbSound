'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Payment.init({
    userId: DataTypes.INTEGER,
    startDate: DataTypes.STRING,
    dueDate: DataTypes.STRING,
    attache: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'payments',
  });
  return Payment;
};