const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my_secret_key';

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(403).json({ error: '未登录' });

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token 无效' });
  }
};