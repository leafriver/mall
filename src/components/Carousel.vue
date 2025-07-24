<template>
  <div class="carousel">
    <button class="carousel-btn left" @click="prev">&#8592;</button>
    <img :src="images[current]" class="carousel-img" :alt="`轮播图${current + 1}`" />
    <button class="carousel-btn right" @click="next">&#8594;</button>
    <div class="carousel-dots">
      <span
        v-for="(img, idx) in images"
        :key="idx"
        :class="['dot', { active: idx === current }]"
        @click="go(idx)"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const images = [
  new URL('../assets/images/1.png', import.meta.url).href,
  new URL('../assets/images/2.png', import.meta.url).href,
  new URL('../assets/images/3.png', import.meta.url).href,
];

const current = ref(0);
let timer: number | undefined;
const interval = 3000;

function startTimer() {
  if (timer) clearInterval(timer);
  timer = window.setInterval(next, interval);
}

function next() {
  current.value = (current.value + 1) % images.length;
  startTimer(); // 重置计时器
}
function prev() {
  current.value = (current.value - 1 + images.length) % images.length;
  startTimer(); // 重置计时器
}
function go(idx: number) {
  current.value = idx;
  startTimer(); // 重置计时器
}

onMounted(() => {
  startTimer();
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.carousel {
  position: relative;
  width: 600px;
  height: 280px;
  margin: 0 auto 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  overflow: hidden;
}
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.2rem;
}
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.7);
  border: none;
  font-size: 2rem;
  padding: 0.2rem 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  transition: background 0.2s;
}
.carousel-btn.left { left: 1rem; }
.carousel-btn.right { right: 1rem; }
.carousel-btn:hover { background: #409eff; color: #fff; }
.carousel-dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ccc;
  cursor: pointer;
  transition: background 0.2s;
}
.dot.active {
  background: #409eff;
}
</style> 