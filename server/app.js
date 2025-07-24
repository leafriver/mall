// app.js
const express = require('express');
const productRouter = require('./routes/product');

const app = express();
const PORT = 3001;

app.use(express.json());

// 路由模块
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
  res.send('Node.js Mall API Server Running');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 