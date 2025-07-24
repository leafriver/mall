<template>
  <div class="product-page">
    <NavBar />
    <h1>商品列表</h1>
    <ul>
      <li>商品A</li>
      <li>商品B</li>
      <li>商品C</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
// 商品列表逻辑
</script>

<style scoped>
.product-page { padding: 2rem; }
</style> 