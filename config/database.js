const { Sequelize } = require('sequelize');

// 数据库连接配置
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',  // 更改为你的数据库方言：'postgres', 'sqlite', 'mssql' 等
  logging: false,   // 可以设置为 true 以启用日志输出
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// 测试数据库连接
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// 导出 sequelize 实例供其他文件使用
module.exports = sequelize;
