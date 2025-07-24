<template>
  <nav class="nav-bar">
    <a href="/home.html" class="nav-link">首页</a>
    <a href="/product.html" class="nav-link">商品列表</a>
    <a href="/cart.html" class="nav-link">购物车</a>
    <a href="/user.html" class="nav-link">用户中心</a>
  </nav>
</template>

<script setup lang="ts">
// 公共导航栏逻辑（如有）
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 1rem 2.5rem;
  margin-bottom: 2rem;
  margin-top: 1.5rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 1.2rem;
  border-radius: 1rem;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}

.nav-link:hover {
  background: #409eff;
  color: #fff;
  box-shadow: 0 2px 8px rgba(64,158,255,0.15);
}
</style> 