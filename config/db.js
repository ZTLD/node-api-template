const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/myapp';

mongoose.connect(mongoURL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

module.exports = mongoose;