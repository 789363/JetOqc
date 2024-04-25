const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const OpInfo = sequelize.define('OpInfo', {
  Op_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Op_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'op_info'
});

module.exports = OpInfo;
