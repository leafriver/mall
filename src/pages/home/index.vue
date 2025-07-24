<template>
  <div class="home-page">
    <NavBar />
    <h1>首页</h1>
    <p>欢迎来到电商商城首页！</p>
    <div class="product-list">
      <ProductCard
        v-for="(imgSrc, i) in productImages"
        :key="i"
        :imgSrc="imgSrc"
        :name="`商品${i + 1}`"
      />
    </div>
    <img src="@/assets/images/p1.png" alt="商品1" />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import ProductCard from '@/components/ProductCard.vue';

const productImages = Array.from({ length: 20 }, (_, i) =>
  new URL(`../../assets/images/p${i + 1}.png`, import.meta.url).href
);
</script>

<style scoped>
.home-page { padding: 2rem; }
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
}
</style> 