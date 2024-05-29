'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('price_list_electrode', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      item_code: Sequelize.STRING,
      brand_name: Sequelize.STRING,
      size: Sequelize.STRING,
      uom: Sequelize.STRING,
      price_list_amt: Sequelize.STRING,
      classification: Sequelize.STRING,
      description_1: Sequelize.STRING,

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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('price_list_electrode');
  }
};