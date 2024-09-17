'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('price_list_hypertherm', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      sub_product:Sequelize.STRING,
      item:Sequelize.STRING,
      uom:Sequelize.STRING,
      list_price_as_per_uom:Sequelize.STRING,
      description_1: Sequelize.STRING,
      item_code_index: Sequelize.INTEGER,
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
    await queryInterface.dropTable('price_list_hypertherm');
  }
};