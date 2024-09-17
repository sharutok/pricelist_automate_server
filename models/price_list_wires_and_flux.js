'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class price_list_wires_and_flux extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  price_list_wires_and_flux.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    index_order: DataTypes.INTEGER,
    item_code: DataTypes.STRING,
    classification: DataTypes.STRING,
    brand_name: DataTypes.STRING,
    size: DataTypes.STRING,
    item_code_index: DataTypes.INTEGER,
    packing: DataTypes.STRING,
    uom: DataTypes.STRING,
    list_price_as_per_uom: DataTypes.STRING,
    description_1: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'price_list_wires_and_flux',
    tableName:'price_list_wires_and_flux'
  });
  return price_list_wires_and_flux;
};