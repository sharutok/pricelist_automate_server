'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('price_list_spares', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      index_order: Sequelize.INTEGER,
      item: Sequelize.STRING(500),
      product_code:Sequelize.STRING(500),
      uom:Sequelize.STRING(500),
      list_price: Sequelize.STRING(500),
      description_1: Sequelize.STRING(500),
      item_code_index: Sequelize.INTEGER,
      description_2: Sequelize.STRING(500),
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
    await queryInterface.dropTable('price_list_spares');
  }
};