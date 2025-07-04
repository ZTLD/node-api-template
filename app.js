const express = require('express');
const mongoose = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});