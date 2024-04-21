const express = require('express');
const { sequelize } = require('./models'); // 从你的 Sequelize 配置中引入实例

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
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
