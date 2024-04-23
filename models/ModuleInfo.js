const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // 确保路径正确

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

module.exports = ModuleInfo;
