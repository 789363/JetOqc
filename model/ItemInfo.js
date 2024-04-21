const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const ItemInfo = sequelize.define('ItemInfo', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item_name: {
    type: DataTypes.STRING
  },
  result_id: {
    type: DataTypes.INTEGER
  }
});

module.exports = ItemInfo;
