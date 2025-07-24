<template>
  <div class="product-card">
    <img :src="imgSrc" :alt="name" class="product-img" />
    <div class="product-name">{{ name }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imgSrc: string;
  name: string;
}>();
</script>

<style scoped>
.product-card {
  width: 260px;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s;
}
.product-card:hover {
  box-shadow: 0 4px 16px rgba(64,158,255,0.15);
}
.product-img {
  width: 200px;
  height: 180px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}
.product-name {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  text-align: center;
}
</style> 