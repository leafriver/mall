<template>
  <div>
    <el-card>
      <template #header>
        <div style="display: flex; align-items: center; gap: 8px; font-size: 18px;">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </div>
      </template>
      <div class="toolbar">
        <el-autocomplete
          v-model="search"
          :fetch-suggestions="querySearch"
          placeholder="搜索昵称/用户名"
          clearable
          @select="handleSelectSuggestion"
          @clear="handleClear"
          class="search-input"
        />
        <div class="toolbar-btns">
          <el-button type="primary" @click="openAddDialog">添加用户</el-button>
          <el-button :disabled="!selectedRow" @click="openEditDialog(selectedRow)" style="margin-left: 8px;">编辑用户</el-button>
          <el-button type="danger" :disabled="!selectedRow" @click="handleDelete(selectedRow)" style="margin-left: 8px;">删除用户</el-button>
          <el-button :disabled="!selectedRow" @click="cancelSelection" style="margin-left: 8px;">取消选中</el-button>
        </div>
      </div>
      <el-table
        ref="tableRef"
        :data="filteredUsers"
        style="width: 100%; margin-top: 16px;"
        stripe
        border
        highlight-current-row
        v-loading="loading"
        empty-text="暂无用户数据"
        @row-click="handleRowClick"
        :current-row="selectedRow"
      >
        <el-table-column prop="id" label="ID" min-width="80" align="center" />
        <el-table-column prop="nickname" label="昵称" min-width="120" align="left" />
        <el-table-column prop="username" label="用户名" min-width="150" align="left" />
      </el-table>
    </el-card>

    <!-- 添加/编辑用户弹窗 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="400px">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" class="user-form">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" :type="showPwd ? 'text' : 'password'" autocomplete="new-password">
            <template #suffix>
              <el-icon @click="showPwd = !showPwd" style="cursor:pointer;">
                <View v-if="!showPwd" />
                <Hide v-else />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="text-align: center;">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit" style="margin-left: 16px;">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onBeforeUnmount } from 'vue';
import { ElMessage, type FormInstance } from 'element-plus';
import axios from 'axios';
import { User, View, Hide } from '@element-plus/icons-vue';

const loading = ref(false);
const users = ref<any[]>([]);
const search = ref('');
const showPwd = ref(false);
const selectedRow = ref<any | null>(null);
const tableRef = ref();
const searchMode = ref<'normal' | 'suggest'>('normal');
const suggestUser = ref<any | null>(null);

const filteredUsers = computed(() => {
  if (searchMode.value === 'suggest' && suggestUser.value) {
    return [suggestUser.value];
  }
  if (!search.value) return users.value;
  return users.value.filter(u =>
    u.nickname.includes(search.value) ||
    u.username.includes(search.value)
  );
});

async function fetchUsers() {
  loading.value = true;
  try {
    const { data } = await axios.get('/api/users', { params: search.value ? { search: search.value } : {} });
    if (data.code === 0) {
      users.value = data.data;
      // 如果当前选中行已被删除，则取消选中
      if (selectedRow.value && !users.value.find(u => u.id === selectedRow.value.id)) {
        selectedRow.value = null;
        tableRef.value?.setCurrentRow(null);
      }
    } else {
      ElMessage.error(data.msg || '获取用户失败');
    }
  } catch (err: any) {
    ElMessage.error(err.message || '获取用户失败');
  } finally {
    loading.value = false;
  }
}

function querySearch(queryString: string, cb: (results: any[]) => void) {
  if (!queryString) {
    cb([]);
    return;
  }
  const results = users.value
    .filter(u => u.nickname.includes(queryString) || u.username.includes(queryString))
    .slice(0, 5)
    .map(u => ({ value: `${u.nickname}（${u.username}）`, user: u }));
  cb(results);
}

function handleSelectSuggestion(item: any) {
  searchMode.value = 'suggest';
  suggestUser.value = item.user;
  // 不再清空 search.value
  selectedRow.value = item.user;
  tableRef.value?.setCurrentRow(item.user);
}

function handleClear() {
  searchMode.value = 'normal';
  suggestUser.value = null;
  selectedRow.value = null;
  tableRef.value?.setCurrentRow(null);
}

function handleSearch() {
  if (search.value) {
    fetchUsers();
  }
}

onMounted(() => {
  fetchUsers();
  window.addEventListener('keydown', handleEscKey);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscKey);
});

function handleRowClick(row: any) {
  if (selectedRow.value && selectedRow.value.id === row.id) {
    selectedRow.value = null;
    tableRef.value?.setCurrentRow(null);
  } else {
    selectedRow.value = row;
    tableRef.value?.setCurrentRow(row);
  }
}

function cancelSelection() {
  selectedRow.value = null;
  tableRef.value?.setCurrentRow(null);
}
function handleEscKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && selectedRow.value) {
    selectedRow.value = null;
    tableRef.value?.setCurrentRow(null);
  }
}

// 添加/编辑弹窗逻辑
const dialogVisible = ref(false);
const dialogTitle = ref('');
const form = reactive({ id: '', nickname: '', username: '', password: '' });
const formRef = ref<FormInstance>();
const rules = {
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

function openAddDialog() {
  dialogTitle.value = '添加用户';
  Object.assign(form, { id: '', nickname: '', username: '', password: '' });
  showPwd.value = false;
  dialogVisible.value = true;
}
function openEditDialog(row: any) {
  if (!row) return;
  dialogTitle.value = '编辑用户';
  Object.assign(form, row);
  form.password = '';
  showPwd.value = false;
  dialogVisible.value = true;
}

async function handleSubmit() {
  formRef.value?.validate(async (valid) => {
    if (!valid) return;
    try {
      if (form.id) {
        // 编辑
        const payload: any = { nickname: form.nickname, username: form.username };
        if (form.password) payload.password = form.password;
        const { data } = await axios.put(`/api/users/${form.id}`, payload);
        if (data.code === 0) {
          ElMessage.success('修改成功');
          fetchUsers();
          dialogVisible.value = false;
        } else {
          ElMessage.error(data.msg || '修改失败');
        }
      } else {
        // 添加
        // 生成唯一 id（10位字符串）
        const newId = Date.now().toString().slice(-10);
        const { data } = await axios.post('/api/users', { ...form, id: newId });
        if (data.code === 0) {
          ElMessage.success('添加成功');
          fetchUsers();
          dialogVisible.value = false;
        } else {
          ElMessage.error(data.msg || '添加失败');
        }
      }
    } catch (err: any) {
      ElMessage.error(err.message || '操作失败');
    }
  });
}

async function handleDelete(row: any) {
  if (!row) return;
  try {
    const { data } = await axios.delete(`/api/users/${row.id}`);
    if (data.code === 0) {
      ElMessage.success('删除成功');
      fetchUsers();
    } else {
      ElMessage.error(data.msg || '删除失败');
    }
  } catch (err: any) {
    ElMessage.error(err.message || '删除失败');
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.toolbar-btns {
  display: flex;
  align-items: center;
}
.search-input {
  width: 260px;
}
.user-form {
  max-width: 350px;
  margin: 0 auto;
}
</style> 