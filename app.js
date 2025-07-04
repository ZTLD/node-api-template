const express = require('express');
const mongoose = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // ← 关键点

app.listen(3000, () => {
  console.log(`✅ Server running at http://${HOST}:${PORT}`);
});