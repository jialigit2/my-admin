<template>
  <div>
    <h2>用户管理</h2>

    <!-- 搜索框 -->
    <el-input
      v-model="searchQuery"
      placeholder="搜索姓名或邮箱"
      style="width: 300px; margin-bottom: 16px"
      clearable
    />

    <!-- 表格 -->
    <el-table :data="pagedUsers" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button type="primary" size="small" @click="editUser(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="filteredUsers.length"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const users = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' },
  { id: 3, name: '王五', email: 'wangwu@example.com' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com' },
  { id: 5, name: '钱七', email: 'qianqi@example.com' },
  { id: 6, name: '孙八', email: 'sunba@example.com' },
  { id: 7, name: '周九', email: 'zhoujiu@example.com' },
])

const searchQuery = ref('')
const pageSize = 3
const currentPage = ref(1)

// 过滤数据
const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.name.includes(searchQuery.value) ||
    user.email.includes(searchQuery.value)
  )
})

// 分页后的数据
const pagedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredUsers.value.slice(start, start + pageSize)
})

// 当搜索时，回到第一页
watch(searchQuery, () => {
  currentPage.value = 1
})

const handlePageChange = (page) => {
  currentPage.value = page
}

const editUser = (user) => {
  console.log('编辑用户:', user)
}

const deleteUser = (user) => {
  console.log('删除用户:', user)
}
</script>
