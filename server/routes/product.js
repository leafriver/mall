// routes/product.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// 获取商品列表
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, price FROM products');
    res.json({ code: 0, data: rows });
  } catch (err) {
    res.status(500).json({ code: 1, msg: '数据库查询失败', error: err.message });
  }
});

module.exports = router; 