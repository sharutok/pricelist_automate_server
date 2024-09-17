'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class price_list_headers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  price_list_headers.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
      pricelist_reference_no: {
        type: DataTypes.STRING
      },
      pricelist_reference_date: {
        type: DataTypes.STRING
      },
      pricelist_description: {
        type: DataTypes.STRING
    },
    pricelist_headers_model_name: {
      type: DataTypes.STRING
    },
    table_header_title: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
  }, {
    sequelize,
    modelName: 'price_list_headers',
  });
  return price_list_headers;
};