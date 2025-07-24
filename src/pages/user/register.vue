<template>
  <div class="register-bg">
    <div class="register-page">
      <h2>用户注册</h2>
      <form @submit.prevent="onRegister">
        <div class="form-item">
          <label>邮箱：</label>
          <input v-model="email" required @input="validateEmail" />
          <div v-if="email && !isEmailValid" class="err">请输入有效的邮箱地址</div>
        </div>
        <div class="form-item">
          <label>密码：</label>
          <input v-model="password" type="password" required @input="checkPasswordStrength" />
          <div class="pwd-strength-bars" v-if="password">
            <div class="bar" :class="{ active: strength >= 1 }"></div>
            <div class="bar" :class="{ active: strength >= 2 }"></div>
            <div class="bar" :class="{ active: strength >= 3 }"></div>
            <span class="strength-label">{{ strengthLabel }}</span>
          </div>
          <div v-if="password && !isPwdLengthValid" class="err">密码长度需8-20位</div>
        </div>
        <div class="form-item">
          <label>确认密码：</label>
          <input v-model="password2" type="password" required />
          <div v-if="password2 && password !== password2" class="err">两次密码输入不一致</div>
        </div>
        <button type="submit" :disabled="!canRegister">注册</button>
      </form>
      <div class="switch-tip">
        已有账号？<a href="/src/pages/user/login.html">去登录</a>
      </div>
      <div v-if="msg" class="msg">{{ msg }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const email = ref('');
const password = ref('');
const password2 = ref('');
const msg = ref('');
const isEmailValid = ref(true);
const isPwdLengthValid = ref(true);
const strength = ref(0);
const strengthLabel = ref('');

function validateEmail() {
  isEmailValid.value = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email.value);
}

function checkPasswordStrength() {
  const pwd = password.value;
  let s = 0;
  if (pwd.length >= 8 && pwd.length <= 20) {
    isPwdLengthValid.value = true;
    if (/[a-z]/.test(pwd)) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/[^a-zA-Z\d]/.test(pwd)) s++;
  } else {
    isPwdLengthValid.value = false;
  }
  strength.value = s;
  if (!pwd) strengthLabel.value = '';
  else if (s <= 1) strengthLabel.value = '弱';
  else if (s === 2) strengthLabel.value = '中';
  else if (s >= 3) strengthLabel.value = '强';
}

const canRegister = computed(() =>
  isEmailValid.value &&
  isPwdLengthValid.value &&
  strength.value >= 2 &&
  password.value === password2.value &&
  !!email.value &&
  !!password.value &&
  !!password2.value
);

function generateUserId() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}
function generateNickname(userId: string) {
  return `用户_${userId}`;
}

async function onRegister() {
  msg.value = '';
  if (!canRegister.value) return;
  const userId = generateUserId();
  const nickname = generateNickname(userId);
  const payload = {
    userId,
    nickname,
    username: email.value,
    password: password.value
  };
  console.log('注册请求参数:', payload);
  const res = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  console.log('注册响应:', data);
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
.register-bg {
  min-height: 100vh;
  background: #eaf4fb;
  display: flex;
  align-items: center;
  justify-content: center;
}
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
  opacity: 1;
  transition: opacity 0.2s;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
.err {
  color: #e74c3c;
  font-size: 0.95rem;
  margin-top: 0.2rem;
}
.pwd-strength-bars {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0.3rem 0 0.2rem 0;
}
.pwd-strength-bars .bar {
  width: 32px;
  height: 8px;
  border-radius: 4px;
  background: #eee;
  transition: background 0.2s;
}
.pwd-strength-bars .bar.active:nth-child(1) { background: #e74c3c; }
.pwd-strength-bars .bar.active:nth-child(2) { background: #f1c40f; }
.pwd-strength-bars .bar.active:nth-child(3) { background: #2ecc71; }
.strength-label {
  font-size: 0.95rem;
  color: #888;
  margin-left: 0.7rem;
}
</style> 