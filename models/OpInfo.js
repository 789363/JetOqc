const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const OpInfo = sequelize.define('LineInfo', {
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
  tableName: 'Op_info'
});

module.exports = OpInfo;
