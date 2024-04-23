const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const ResultInfo = require('./ResultInfo'); // 引入ResultInfo模型

const ItemInfo = sequelize.define('ItemInfo', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  result_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'result_info', // 确保是数据库中的表名
      key: 'result_id'
    }
  }
}, {
  tableName: 'item_info'
});

// 定义模型之间的关系
ItemInfo.belongsTo(ResultInfo, { foreignKey: 'result_id' });
ResultInfo.hasMany(ItemInfo, { foreignKey: 'result_id' });

module.exports = ItemInfo;
