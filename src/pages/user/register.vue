<template>
  <div class="register-page">
    <h2>用户注册</h2>
    <form @submit.prevent="onRegister">
      <div class="form-item">
        <label>用户名：</label>
        <input v-model="username" required />
      </div>
      <div class="form-item">
        <label>密码：</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">注册</button>
    </form>
    <div class="switch-tip">
      已有账号？<a href="/src/pages/user/login.html">去登录</a>
    </div>
    <div v-if="msg" class="msg">{{ msg }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const msg = ref('');

async function onRegister() {
  msg.value = '';
  const res = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  });
  const data = await res.json();
  if (data.code === 0) {
    msg.value = '注册成功，正在跳转...';
    setTimeout(() => {
      window.location.href = '/src/pages/user/login.html';
    }, 1200);
  } else {
    msg.value = data.msg || '注册失败';
  }
}
</script>

<style scoped>
.register-page {
  max-width: 350px;
  margin: 4rem auto;
  padding: 2rem 2.5rem;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}
.form-item {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 0.3rem;
  color: #666;
}
input {
  padding: 0.5rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
}
button {
  width: 100%;
  padding: 0.7rem;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 0.7rem;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 0.5rem;
}
button:hover {
  background: #3076c9;
}
.switch-tip {
  margin-top: 1.2rem;
  text-align: center;
  color: #888;
}
.switch-tip a {
  color: #409eff;
  text-decoration: underline;
  margin-left: 0.3rem;
}
.msg {
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
}
</style> 