# 使用帶有 Node.js 的基礎鏡像
FROM node:16

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝項目依賴
RUN npm install

# 複製項目文件到容器中
COPY . .

# 應用運行在哪個端口
EXPOSE 3000

# 使用 npm run start 啟動應用
CMD ["npm", "run", "start"]
