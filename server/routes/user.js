// routes/user.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// 注册
router.post('/register', async (req, res) => {
  const { userId, nickname, username, password } = req.body;
  if (!userId || !nickname || !username || !password) return res.status(400).json({ code: 1, msg: '信息不全' });
  try {
    // 自动建表
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(10) PRIMARY KEY,
        nickname VARCHAR(32) NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL
      )
    `);
    // 检查邮箱唯一
    const [rows] = await db.query('SELECT id FROM users WHERE username=?', [username]);
    if (rows.length) return res.json({ code: 1, msg: '邮箱已注册' });
    // 插入新用户
    await db.query('INSERT INTO users (id, nickname, username, password) VALUES (?, ?, ?, ?)', [userId, nickname, username, password]);
    res.json({ code: 0, msg: '注册成功' });
  } catch (err) {
    res.status(500).json({ code: 1, msg: '注册失败', error: err.message });
  }
});

// 登录
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ code: 1, msg: '邮箱和密码必填' });
  try {
    const [rows] = await db.query('SELECT id, nickname FROM users WHERE username=? AND password=?', [username, password]);
    if (rows.length) {
      res.json({ code: 0, msg: '登录成功', userId: rows[0].id, nickname: rows[0].nickname });
    } else {
      res.json({ code: 1, msg: '邮箱或密码错误' });
    }
  } catch (err) {
    res.status(500).json({ code: 1, msg: '登录失败', error: err.message });
  }
});

module.exports = router; 