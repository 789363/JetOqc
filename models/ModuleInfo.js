const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // 确保路径正确
const ItemInfo = require('./ItemInfo'); // 引入ItemInfo模型
const ModuleInfo = sequelize.define('ModuleInfo', {
  module_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  module_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  item_id: {
    type: DataTypes.JSON
  }
}, {
  tableName: 'module_info' // 指定表名
});

// ModuleInfo 有多个 ItemInfo
ModuleInfo.hasMany(ItemInfo, { foreignKey: 'module_id' });
// 每个 ItemInfo 属于一个 ModuleInfo
ItemInfo.belongsTo(ModuleInfo, { foreignKey: 'module_id' });

module.exports = ModuleInfo;
