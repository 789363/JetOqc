const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const LineInfo = sequelize.define('LineInfo', {
  line_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  line_name: {
    type: DataTypes.STRING
  }
});

module.exports = LineInfo;
