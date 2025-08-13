<script setup>
import Counter from './components/Counter.vue'
</script>

<template>
  <div> 
    <h1> 我的后台管理系统 </h1>
    <Counter />
    <Counter :initial="5"/>
  </div>
</template>

 
