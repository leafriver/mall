<template>
  <el-container style="height: 100vh">
    <el-aside width="200px">
      <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" @select="handleMenuSelect">
        <el-menu-item index="dashboard">仪表盘</el-menu-item>
        <el-menu-item index="product">商品管理</el-menu-item>
        <el-menu-item index="user">用户管理</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>后台管理系统</el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const activeMenu = ref('dashboard');
function handleMenuSelect(index: string) {
  activeMenu.value = index;
  router.push({ name: index });
}
</script>

<style scoped>
.el-header {
  background: #409eff;
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
</style> 