'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class price_list_electrode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  price_list_electrode.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    item_code: {
      type: DataTypes.STRING,
      unique:true
    },
    brand_name: DataTypes.STRING,
    size: DataTypes.STRING,
    classification: DataTypes.STRING,
    uom: DataTypes.STRING,
    price_list_amt: DataTypes.STRING,
    description_1: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'price_list_electrode',
    tableName: 'price_list_electrode',
  });
  return price_list_electrode;
};