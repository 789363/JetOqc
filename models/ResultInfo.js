const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const ResultInfo = sequelize.define('ResultInfo', {
  result_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  result_content: {
    type: DataTypes.JSON
  }
});

module.exports = ResultInfo;
