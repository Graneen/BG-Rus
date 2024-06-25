'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BayerOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameboard: {
        type: Sequelize.STRING, 
        allowNull: false 
      },
      name: {
        type: Sequelize.STRING, 
        allowNull: false 
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', 
          key: 'id'
        }
      },
      comment: {
        type: Sequelize.TEXT 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BayerOrders');
  }
};