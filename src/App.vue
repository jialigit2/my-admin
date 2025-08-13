<template>
  <div>
    <h1>后台管理系统</h1>
    <nav>
      <router-link to="/">首页</router-link> |
      <router-link to="/users">用户管理</router-link> |
      <router-link to="/reports">数据统计</router-link>
    </nav>
    <hr />
    <router-view></router-view>
  </div>
</template>
