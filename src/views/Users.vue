<template>
  <div>
    <h2>用户管理</h2>
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
      :total="users.length"
      :page-size="pageSize"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const users = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' },
  { id: 3, name: '王五', email: 'wangwu@example.com' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com' },
  { id: 5, name: '钱七', email: 'qianqi@example.com' },
  { id: 6, name: '孙八', email: 'sunba@example.com' },
  { id: 7, name: '周九', email: 'zhoujiu@example.com' },
])

const pageSize = 3
const currentPage = ref(1)

const pagedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return users.value.slice(start, start + pageSize)
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
