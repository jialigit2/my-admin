import { createRouter, createWebHistory } from 'vue-router'

// 导入页面组件
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import Reports from '../views/Reports.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/users', name: 'users', component: Users },
  { path: '/reports', name: 'reports', component: Reports },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
