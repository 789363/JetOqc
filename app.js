const express = require('express');
const moduleRoutes = require('./routes/moduleRoutes');
const OpRoutes = require('./routes/OpRoutes');
const cors = require('cors');
const machineRoutes = require('./routes/machineRoutes');  // 确保添加这些路由
const lineRoutes = require('./routes/lineRoutes');
const itemRoutes = require('./routes/itemRoutes');
const resultRoutes = require('./routes/resultRoutes');
const checkItemsRoutes = require('./routes/checkItemsRoutes');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json') // 剛剛輸出的 JSON



const app = express();
// 啟用 CORS
app.use(cors({
    origin: '*'  // 允許所有域的請求
}));
app.use(express.json());  // 用于解析 JSON 请求体

// 使用路由
app.use('/api', moduleRoutes);
app.use('/api', OpRoutes);
app.use('/api', machineRoutes);
app.use('/api', lineRoutes);
app.use('/api', itemRoutes);
app.use('/api', resultRoutes);
app.use('/api', checkItemsRoutes);

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
