const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const CheckInfo = require('./CheckInfo'); // 确保引入了CheckInfo模型

const ReasonInfo = sequelize.define('ReasonInfo', {
    reason_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    checkitem_id: {  // 外键指向CheckInfo
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'check_info',  // 这里要用表名
            key: 'checkitem_id'
        }
    }
}, {
    tableName: 'reason_info'
});

// 设置模型关系
ReasonInfo.belongsTo(CheckInfo, { foreignKey: 'checkitem_id' });
CheckInfo.hasMany(ReasonInfo, { foreignKey: 'checkitem_id' });

module.exports = ReasonInfo;
