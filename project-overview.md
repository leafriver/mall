# 项目整体功能概述

## 一、前端部分（Vue 3 + Vite 多页面 MPA）

- **多页面架构（MPA）**：
  - 首页（商品轮播、商品卡展示）
  - 商品列表页
  - 购物车页
  - 用户中心页（需登录）
  - 登录页、注册页
- **公共组件**：
  - 顶部导航栏（全局可见，sticky 固定）
  - 商品展示卡
  - 首页轮播图
- **用户认证流程**：
  - 未登录访问用户中心自动跳转到登录页
  - 登录页支持跳转注册页，注册页支持跳转登录页
  - 登录成功后 userId 存入 localStorage，跳转用户中心
- **商品展示**：
  - 首页轮播图展示精选图片
  - 首页批量展示商品图片（p1.png~p20.png）

## 二、后端部分（Node.js + Express + MySQL，模块化设计）

- **商品模块**：
  - `/api/products`：获取商品列表，数据来自 MySQL `products` 表
- **用户模块**：
  - `/api/users/register`：注册新用户，校验用户名唯一，写入 MySQL `users` 表
  - `/api/users/login`：用户登录，校验用户名密码，返回 userId
- **数据库结构**：
  - `products` 表：商品信息（id, name, price）
  - `users` 表：用户信息（id, username, password）
- **模块化结构**：
  - 路由、数据库连接、业务逻辑分离，便于扩展

## 三、目录结构简要

```
mall/
  src/
    assets/images/         # 商品图片、轮播图
    components/            # 公共组件（NavBar, ProductCard, Carousel等）
    pages/
      home/                # 首页
      product/             # 商品列表
      cart/                # 购物车
      user/                # 用户中心、登录、注册
  server/
    app.js                 # 后端入口
    db/                    # 数据库连接
    routes/                # 路由模块（product.js, user.js等）
    package.json           # 后端依赖
```

## 四、可扩展方向
- 商品详情页、订单模块、后台管理
- 用户token鉴权、密码加密、接口安全
- 前端UI美化、移动端适配

---

> 本文档用于快速了解本项目的整体功能与结构，便于后续开发和维护。 