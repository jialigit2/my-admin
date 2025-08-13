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

    <el-button type="primary" @click="openAddDialog">新增用户</el-button>
    <!-- 表格 -->
    <el-table :data="pagedUsers" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
           <el-button type="primary" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="scope">
            <el-tag :type="scope.row.status === '在线' ? 'success' : 'info'">
            {{ scope.row.status }}
            </el-tag>
        </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
            <template #default="scope">
                <el-switch
                v-model="scope.row.status"
                active-value="激活"
                inactive-value="禁用"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="handleStatusChange(scope.row)"
                />
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

    <!-- 弹窗表单 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑用户' : '新增用户'">
      <el-form :model="form" :rules="rules" ref="userForm" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
   <el-form-item label="状态" prop="status">
  <el-select v-model="form.status" placeholder="请选择状态">
    <el-option label="激活" value="激活"></el-option>
    <el-option label="禁用" value="禁用"></el-option>
  </el-select>
</el-form-item>


      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const store = useStore()

const searchQuery = ref('')
const pageSize = 3
const currentPage = ref(1)

// 过滤数据
const filteredUsers = computed(() => {
  return store.state.users.filter(user =>
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

const dialogVisible = ref(false)
const isEdit = ref(false)
const form = ref({ id: null, name: '', email: '' })
const userForm = ref(null)

// 表单规则
const rules = {
  name: [
    { required: true, message: '姓名不能为空', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}


const openAddDialog = () => {
  isEdit.value = false
  form.value = { id: null, name: '', email: '', status: '激活' } // 默认激活
  dialogVisible.value = true
}


const openEditDialog = (user) => {
  isEdit.value = true
  form.value = { ...user }
  dialogVisible.value = true
}

const saveUser = () => {
  userForm.value.validate(valid => {
    if (!valid) return
    if (isEdit.value) {
      store.commit('updateUser', form.value)
      ElMessage.success('用户已更新')
    } else {
      const newId = Math.max(...store.state.users.map(u => u.id), 0) + 1
      store.commit('addUser', { ...form.value, id: newId })
      ElMessage.success('用户已新增')
    }
    dialogVisible.value = false
  })
}


const deleteUser = (user) => {
  store.commit('deleteUser', user.id)
  ElMessage.success('用户已删除')
}

const handleStatusChange = (user) => {
  store.commit('updateUserStatus', { id: user.id, status: user.status })
  // 如果有接口，这里可以调用更新状态的接口
}

</script>
