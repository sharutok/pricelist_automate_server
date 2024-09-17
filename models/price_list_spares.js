'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class price_list_spares extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  price_list_spares.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    index_order: DataTypes.INTEGER,
    item: DataTypes.STRING(500),
    product_code: DataTypes.STRING(500),
    uom: DataTypes.STRING(500),
    item_code_index: DataTypes.INTEGER,
    list_price: DataTypes.STRING(500),
    description_1: DataTypes.STRING(500),
    description_2: DataTypes.STRING(500),
    
  }, {
    sequelize,
    modelName: 'price_list_spares',
  });
  return price_list_spares;
};

