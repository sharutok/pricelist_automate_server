'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class price_list_hypertherm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  price_list_hypertherm.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    item_code_index: DataTypes.INTEGER,
    index_order: DataTypes.INTEGER,
    sub_product: DataTypes.STRING,
    item: DataTypes.STRING,
    uom: DataTypes.STRING,
    list_price_as_per_uom: DataTypes.STRING,
    description_1: DataTypes.STRING,

  },
    {
    sequelize,
      modelName: 'price_list_hypertherm',
      tableName: 'price_list_hypertherm'
  });
  return price_list_hypertherm;
};