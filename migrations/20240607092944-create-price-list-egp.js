'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('price_list_egp', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      description_1: Sequelize.STRING(500),
      description_2: Sequelize.STRING(500),
      description_3: Sequelize.STRING(500),
      brand_name: Sequelize.STRING(500),
      item_code: Sequelize.STRING(500),
      uom: Sequelize.STRING(500),
      list_price: Sequelize.STRING(500),
      category: Sequelize.STRING(500),
      index_order: Sequelize.INTEGER,
      item_code_index: Sequelize.INTEGER,
      optional_item_index: Sequelize.INTEGER,
      product_classification_index: Sequelize.INTEGER,
      optional_classification: Sequelize.STRING(500),
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
    await queryInterface.dropTable('price_list_egp');
  }
};