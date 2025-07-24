<template>
  <div class="user-page">
    <NavBar />
    <h1>用户中心</h1>
    <div v-if="userId">
      <p>欢迎，用户ID：{{ userId }}</p>
      <button @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import NavBar from '@/components/NavBar.vue';

const userId = ref<string | null>(null);

onMounted(() => {
  userId.value = localStorage.getItem('userId');
  if (!userId.value) {
    window.location.href = '/src/pages/user/login.html';
  }
});

function logout() {
  localStorage.removeItem('userId');
  window.location.href = '/src/pages/user/login.html';
}
</script>

<style scoped>
.user-page { padding: 2rem; }
button {
  margin-top: 1.5rem;
  padding: 0.6rem 1.2rem;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 0.7rem;
  font-size: 1rem;
  cursor: pointer;
}
button:hover {
  background: #3076c9;
}
</style> 