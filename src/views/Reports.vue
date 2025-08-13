<template>
  <div>
    <h2>用户数据报告</h2>

    <p>用户总数: {{ totalUsers }}</p>
    <p>激活用户: {{ activeUsers }} ({{ activePercent }}%)</p>
    <p>禁用用户: {{ inactiveUsers }} ({{ inactivePercent }}%)</p>

    <div ref="chartRef" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import * as echarts from 'echarts'

// 假设这里直接引入 users 数据
import { useStore } from 'vuex'

const store = useStore()

const chartRef = ref(null)
let chartInstance = null

const users = ref( store.state.users)
// 统计数据
const totalUsers = computed(() => users.value.length)
const activeUsers = computed(() => users.value.filter(u => u.status === '激活').length)
const inactiveUsers = computed(() => users.value.filter(u => u.status === '禁用').length)
const activePercent = computed(() => ((activeUsers.value / totalUsers.value) * 100).toFixed(1))
const inactivePercent = computed(() => ((inactiveUsers.value / totalUsers.value) * 100).toFixed(1))

const renderChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  const option = {
    title: { text: '用户状态分布', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [
      {
        name: '用户状态',
        type: 'pie',
        radius: '50%',
        data: [
          { value: activeUsers.value, name: '激活' },
          { value: inactiveUsers.value, name: '禁用' },
        ],
        emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } },
      },
    ],
  }
  chartInstance.setOption(option)
}

// 初始化
onMounted(() => {
  renderChart()
})

// 监听 store.users 变化，实时更新图表
watch(
  () => store.state.users,
  () => {
    if (chartInstance) renderChart()
  },
  { deep: true }
)
</script>
