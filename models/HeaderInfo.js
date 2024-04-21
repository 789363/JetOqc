const { DataTypes } = require('sequelize');
const sequelize = require('./database');

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
    type: DataTypes.INTEGER
  },
  machine_id: {
    type: DataTypes.INTEGER
  }
});

module.exports = HeaderInfo;
