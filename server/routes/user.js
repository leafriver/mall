// routes/user.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// 注册
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ code: 1, msg: '用户名和密码必填' });
  try {
    const [rows] = await db.query('SELECT id FROM users WHERE username=?', [username]);
    if (rows.length) return res.json({ code: 1, msg: '用户名已存在' });
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    res.json({ code: 0, msg: '注册成功' });
  } catch (err) {
    res.status(500).json({ code: 1, msg: '注册失败', error: err.message });
  }
});

// 登录
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ code: 1, msg: '用户名和密码必填' });
  try {
    const [rows] = await db.query('SELECT id FROM users WHERE username=? AND password=?', [username, password]);
    if (rows.length) {
      res.json({ code: 0, msg: '登录成功', userId: rows[0].id });
    } else {
      res.json({ code: 1, msg: '用户名或密码错误' });
    }
  } catch (err) {
    res.status(500).json({ code: 1, msg: '登录失败', error: err.message });
  }
});

module.exports = router; 