const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

const databaseConfig = {
  host: 'localhost',
  port: '2001',
  user: 'root',
  password: 'jet-admin',
  database: 'mydb'
};

const sequelize = new Sequelize(databaseConfig.database, databaseConfig.user, databaseConfig.password, {
  host: databaseConfig.host,
  port: databaseConfig.port,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

async function checkAndCreateDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    if (error.name === 'SequelizeConnectionError') {
      try {
        const connection = await mysql.createConnection({
          host: databaseConfig.host,
          port: databaseConfig.port,
          user: databaseConfig.user,
          password: databaseConfig.password
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseConfig.database}`);
        await connection.end();
        console.log('Database created successfully.');
      } catch (err) {
        console.error('Failed to create the database:', err);
      }

      // 重新初始化 Sequelize 实例或确保设置已更新
      sequelize.sync().then(() => {
        console.log('Database tables created/updated.');
      });
    }
  }
}

checkAndCreateDatabase();

module.exports = sequelize;
