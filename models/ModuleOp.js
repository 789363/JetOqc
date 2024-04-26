const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // 确保路径正确
const ItemInfo = require('./ItemInfo'); // 引入ItemInfo模型

// 定义 ModuleInfo 模型
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
}, {
  tableName: 'module_info'
});

// 定义 OpInfo 模型
const OpInfo = sequelize.define('OpInfo', {
  op_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  op_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'op_info'
});

// 创建关联表 ModuleOp
const ModuleOp = sequelize.define('ModuleOp', {
  module_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ModuleInfo,
      key: 'module_id'
    }
  },
  op_id: {
    type: DataTypes.INTEGER,
    references: {
      model: OpInfo,
      key: 'op_id'
    }
  }
}, {
  tableName: 'module_op'
});

// 设置多对多关系
ModuleInfo.belongsToMany(OpInfo, { through: ModuleOp, foreignKey: 'module_id' });
OpInfo.belongsToMany(ModuleInfo, { through: ModuleOp, foreignKey: 'op_id' });

// ModuleInfo 有多个 ItemInfo
ModuleInfo.hasMany(ItemInfo, { foreignKey: 'module_id' });
ItemInfo.belongsTo(ModuleInfo, { foreignKey: 'module_id' });

module.exports = { ModuleInfo, OpInfo, ItemInfo };
