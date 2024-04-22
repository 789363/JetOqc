const express = require('express');
const moduleRoutes = require('./routes/moduleRoutes');
const headerRoutes = require('./routes/headerRoutes');
const machineRoutes = require('./routes/machineRoutes');  // 确保添加这些路由
const lineRoutes = require('./routes/lineRoutes');
const itemRoutes = require('./routes/itemRoutes');
const resultRoutes = require('./routes/resultRoutes');

const app = express();
app.use(express.json());  // 用于解析 JSON 请求体

// 使用路由
app.use('/api', moduleRoutes);
app.use('/api', headerRoutes);
app.use('/api', machineRoutes);
app.use('/api', lineRoutes);
app.use('/api', itemRoutes);
app.use('/api', resultRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
