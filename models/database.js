const { Sequelize } = require('sequelize');

// 数据库连接配置
const sequelize = new Sequelize('mydb', 'root', 'jet-admin', {
  host: 'localhost',      // Docker 映射到本地机器的地址
  port: '2001',           // Docker 映射的端口
  dialect: 'mysql',       // 使用 MariaDB 时，方言设置为 'mysql'
  logging: false,         // 根据需要设置日志输出
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
