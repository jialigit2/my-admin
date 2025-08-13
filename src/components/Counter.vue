<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    initial: {
        type: Number,
        default:0
    }
})
// 定义一个响应式变量 count
const count = ref(props.initial)

// 定义一个方法来加一
function increment() {
  count.value++
}

function decresement() {
  count.value--;
}

const countColor = computed(()=> {
  if (count.value > 0) {
    return 'green'
  }else if(count.value ==0){
    return 'black'
  }else{
    return 'red'
  }
})
</script>

<template>
  <div style="text-align: center; padding-top: 50px;">
    <h1>Vue3 计数器</h1>
    <p :style="{color: countColor}">当前计数：{{ count }}</p>
    <button @click="increment">+1</button>
    <button @click="decresement">-1</button>
  </div>
</template>

<style>
button {
  padding: 8px 16px;
  font-size: 16px;
}
</style>
