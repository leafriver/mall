   CREATE DATABASE IF NOT EXISTS mall DEFAULT CHARSET utf8mb4;
   USE mall;
   CREATE TABLE IF NOT EXISTS products (
     id INT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     price DECIMAL(10,2) NOT NULL
   );
   
   INSERT INTO products (name, price) VALUES ('商品1', 100), ('商品2', 200), ('商品3', 300);