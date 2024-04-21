const { DataTypes } = require('sequelize');
const sequelize = require('./index');  // 引入 Sequelize 实例

const ModuleInfo = sequelize.define('ModuleInfo', {
  module_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  header_id: {
    type: DataTypes.INTEGER
  },
  module_name: {
    type: DataTypes.STRING
  },
  item_id: {
    type: DataTypes.JSON
  }
});

module.exports = ModuleInfo;
