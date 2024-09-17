'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('price_list_headers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      pricelist_reference_no: {
        type: Sequelize.STRING
      },
      pricelist_reference_date: {
        type: Sequelize.STRING
      },
      pricelist_description: {
        type: Sequelize.STRING
      },
      pricelist_headers_model_name: {
        type: Sequelize.STRING
      },
      table_header_title: {
        type: Sequelize.ARRAY(Sequelize.STRING)
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('price_list_headers');
  }
};