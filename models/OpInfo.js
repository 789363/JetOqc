const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // 确保路径正确

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

module.exports = OpInfo;
