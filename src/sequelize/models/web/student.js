'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    realname: DataTypes.STRING,
    school: DataTypes.STRING,
    grade: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER,
    birth: DataTypes.DATE,
    sex: DataTypes.BOOLEAN
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsTo(models.Parent);
  };
  return Student;
};