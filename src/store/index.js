import { createStore } from 'vuex'

export default createStore({
  state: {
    users: [
      { id: 1, name: '张三', email: 'zhangsan@example.com', status: '激活' },
      { id: 2, name: '李四', email: 'lisi@example.com', status: '禁用' },
      { id: 3, name: '王五', email: 'wangwu@example.com', status: '激活' },
    ],
  },
  getters: {
    totalUsers: (state) => state.users.length,
    activeUsers: (state) => state.users.filter(u => u.status === '激活').length,
    inactiveUsers: (state) => state.users.filter(u => u.status === '禁用').length,
  },
  mutations: {
    addUser(state, user) {
      state.users.push(user)
    },
    updateUser(state, user) {
      const index = state.users.findIndex(u => u.id === user.id)
      if (index !== -1) state.users[index] = user
    },
    deleteUser(state, id) {
      state.users = state.users.filter(u => u.id !== id)
    },
    updateUserStatus(state, { id, status }) {
      const user = state.users.find(u => u.id === id)
      if (user) user.status = status
    },
  },
  actions: {},
})
