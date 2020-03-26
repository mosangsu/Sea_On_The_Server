'use strict';
module.exports = (sequelize, DataTypes) => {
  const Parent = sequelize.define('Parent', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    realname: DataTypes.STRING,
    phoneNum: DataTypes.STRING,
    promotion: DataTypes.STRING
  }, {});
  Parent.associate = function(models) {
    // associations can be defined here
    Parent.hasMany(models.Student);
  };
  return Parent;
};