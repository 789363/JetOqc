const { Sequelize } = require('sequelize');

// 数据库连接配置
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',  // 可以根据你的数据库类型更改，例如 'postgres', 'sqlite', 'mssql' 等
  logging: false,   // 可以开启日志显示详细信息，设为 true 或指定自定义日志函数
  pool: {
    max: 5,         // 连接池中最大连接数量
    min: 0,         // 连接池中最小连接数量
    acquire: 30000, // 在抛出错误之前，连接池尝试获取连接的最长时间（以毫秒为单位）
    idle: 10000     // 一个连接在被释放前可以空闲的最长时间（以毫秒为单位）
  }
});

// 导出 sequelize 实例供其他文件使用
module.exports = sequelize;
