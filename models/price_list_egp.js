'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class price_list_egp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  price_list_egp.init({
     id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
    description_1:DataTypes.STRING(500),
    description_2:DataTypes.STRING(500),
    description_3:DataTypes.STRING(500),
    brand_name:DataTypes.STRING(500),
    item_code:DataTypes.STRING(500),
    uom:DataTypes.STRING(500),
    list_price:DataTypes.STRING(500),
    category:DataTypes.STRING(500),
    index_order: DataTypes.INTEGER,
    item_code_index: DataTypes.INTEGER,
    optional_item_index: DataTypes.INTEGER,
    product_classification_index: DataTypes.INTEGER,
    optional_classification:DataTypes.STRING(500),
  }, {
    sequelize,
    modelName: 'price_list_egp',
    tableName: 'price_list_egp',
  });
  return price_list_egp;
};


