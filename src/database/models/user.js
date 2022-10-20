'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Rol,{
        as :'rol',
        foreignKey : 'rolId'
      });

      User.hasOne(models.Gender, {
        as : 'gender',
        foreignKey : 'genderId'
      });

      User.hasMany(models.Address, {
        as : 'address',
        foreignKey : 'userId'
      });

      User.hasMany(models.Order,{
        as : 'orders',
        foreignKey : 'userId'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    avatar : DataTypes.STRING,
    genderId: DataTypes.INTEGER,
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};