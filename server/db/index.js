// db/index.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2021615', // 请替换为你的MySQL密码
  database: 'mall',          // 请确保已创建该数据库
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool; 