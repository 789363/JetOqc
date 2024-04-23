const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // 确保路径正确
const HeaderInfo = require('./HeaderInfo'); // 引入HeaderInfo模型

const ModuleInfo = sequelize.define('ModuleInfo', {
  module_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  header_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'header_info', // 确保是数据库中的表名
      key: 'header_id'
    }
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

// 定义模型之间的关系
ModuleInfo.belongsTo(HeaderInfo, { foreignKey: 'header_id' });
HeaderInfo.hasMany(ModuleInfo, { foreignKey: 'header_id' });

module.exports = ModuleInfo;
