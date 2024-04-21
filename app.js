const express = require('express');
const { sequelize } = require('./models/database'); // 确保从正确的地方引入 sequelize 实例

const app = express();

app.use(express.json());

// 示例路由
app.get('/', (req, res) => {
  res.status(200).send('API is working');
});

// 监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {

    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
