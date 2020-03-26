'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      realname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      school: {
        type: Sequelize.STRING
      },
      grade: {
        type: Sequelize.INTEGER
      },
      parentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Parents',
          key: 'id'
        }
      },
      birth: {
        allowNull: false,
        type: Sequelize.DATE
      },
      sex: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Students');
  }
};