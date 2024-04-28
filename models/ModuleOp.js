const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const ModuleOp = sequelize.define('ModuleOp', {
  module_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'ModuleInfo',  // 注意：这里使用字符串是因为模型可能还未加载
      key: 'module_id'
    }
  },
  op_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'OpInfo',  // 同上
      key: 'op_id'
    }
  }
}, {
  tableName: 'module_op'
});

module.exports = ModuleOp;
