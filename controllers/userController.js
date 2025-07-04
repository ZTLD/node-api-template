const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Record = require('../models/Record');
const SECRET_KEY = 'my_secret_key';
// 注册
exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcryptjs.hash(password, 10);
  try {
    const user = new User({ username, password: hash });
    await user.save();
    res.json({ message: '注册成功' });
  } catch (err) {
    res.status(400).json({ error: '用户名已存在' });
  }
};
// 登录
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: '账号错误' });

  const match = await bcryptjs.compare(password, user.password);
  if (!match) return res.status(401).json({ error: '密码错误' });

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '2h' });
  res.json({ token });
};

// 添加记录
exports.addRecord = async (req, res) => {
  const { name, amount } = req.body;
  if (!name || amount == null) {
    return res.status(400).json({ error: '请提供 name 和 amount' });
  }

  const record = new Record({ name, amount });
  await record.save();
  res.json({ message: '添加成功', record });
};
//查询
exports.getRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ _id: -1 }); // 倒序显示最新
    res.json({ records });
  } catch (err) {
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.profile = (req, res) => {
  res.json({ message: '欢迎访问受保护的用户信息', user: req.user });
};