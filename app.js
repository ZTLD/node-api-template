// 引入模块
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

// 初始化 app
const app = express();
app.use(cors());
app.use(express.json());

// 读取 MongoDB 连接地址（从环境变量读取）
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/myapp';

// 连接数据库
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); // 连接失败，退出进程
});

// 简单测试路由
app.get('/', (req, res) => {
  res.send('Hello from Node.js API on Railway!');
});

// 监听端口，HOST 必须是 0.0.0.0
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});
