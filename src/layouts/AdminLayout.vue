<template>
  <el-container style="height: 100vh">
    <!-- 左侧导航栏 -->
    <el-aside width="200px" style="background-color: #304156; color: white;">
      <h3 style="padding: 20px;">后台系统</h3>
      <el-menu
        router
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/users">用户管理</el-menu-item>
        <el-menu-item index="/reports">数据统计</el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧内容区 -->
    <el-container>
      <el-header style="background-color: #fff; box-shadow: 0 1px 4px rgba(0,0,0,.1);">
        <h2>欢迎进入后台</h2>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
