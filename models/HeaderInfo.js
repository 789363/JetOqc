const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const LineInfo = require('./LineInfo'); // 引入LineInfo模型
const MachineInfo = require('./MachineInfo'); // 引入MachineInfo模型

const HeaderInfo = sequelize.define('HeaderInfo', {
  header_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  op_id: {
    type: DataTypes.INTEGER
  },
  pcb_id: {
    type: DataTypes.INTEGER
  },
  line_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'line_info', // 数据库中的表名
      key: 'line_id'
    }
  },
  machine_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'machine_info', // 数据库中的表名
      key: 'machine_id'
    }
  }
}, {
  tableName: 'header_info'
});

// 定义模型之间的关系
HeaderInfo.belongsTo(LineInfo, { foreignKey: 'line_id' });
LineInfo.hasMany(HeaderInfo, { foreignKey: 'line_id' });
HeaderInfo.belongsTo(MachineInfo, { foreignKey: 'machine_id' });
MachineInfo.hasMany(HeaderInfo, { foreignKey: 'machine_id' });

module.exports = HeaderInfo;
