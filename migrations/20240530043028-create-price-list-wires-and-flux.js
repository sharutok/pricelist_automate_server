'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('price_list_wires_and_flux', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      item_code: Sequelize.STRING,
      classification: Sequelize.STRING,
      brand_name: Sequelize.STRING,
      size: Sequelize.STRING,
      packing: Sequelize.STRING,
      uom: Sequelize.STRING,
      item_code_index: Sequelize.INTEGER,
      list_price_as_per_uom: Sequelize.STRING,
      description_1: Sequelize.STRING,
      index_order: Sequelize.INTEGER,
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
    await queryInterface.dropTable('price_list_wires_and_flux');
  }
};