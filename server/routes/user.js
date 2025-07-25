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

// 获取所有用户（支持按 nickname/username 查询）
router.get('/', async (req, res) => {
  const { search } = req.query;
  try {
    let sql = 'SELECT id, nickname, username FROM users';
    let params = [];
    if (search) {
      sql += ' WHERE nickname LIKE ? OR username LIKE ?';
      params = [`%${search}%`, `%${search}%`];
    }
    const [rows] = await db.query(sql, params);
    res.json({ code: 0, data: rows });
  } catch (err) {
    res.status(500).json({ code: 1, msg: '获取用户失败', error: err.message });
  }
});

// 添加用户
router.post('/', async (req, res) => {
  const { id, nickname, username, password } = req.body;
  if (!id || !nickname || !username || !password) return res.status(400).json({ code: 1, msg: '信息不全' });
  try {
    await db.query('INSERT INTO users (id, nickname, username, password) VALUES (?, ?, ?, ?)', [id, nickname, username, password]);
    res.json({ code: 0, msg: '添加成功' });
  } catch (err) {
    res.status(500).json({ code: 1, msg: '添加失败', error: err.message });
  }
});

// 修改用户
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nickname, username, password } = req.body;
  if (!nickname || !username) return res.status(400).json({ code: 1, msg: '信息不全' });
  try {
    let sql = 'UPDATE users SET nickname=?, username=?';
    let params = [nickname, username];
    if (password) {
      sql += ', password=?';
      params.push(password);
    }
    sql += ' WHERE id=?';
    params.push(id);
    await db.query(sql, params);
    res.json({ code: 0, msg: '修改成功' });
  } catch (err) {
    res.status(500).json({ code: 1, msg: '修改失败', error: err.message });
  }
});

// 删除用户
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM users WHERE id=?', [id]);
    res.json({ code: 0, msg: '删除成功' });
  } catch (err) {
    res.status(500).json({ code: 1, msg: '删除失败', error: err.message });
  }
});

module.exports = router; 