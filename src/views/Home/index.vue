<template>
  <div class="home">
    <h1>欢迎来到首页</h1>
    <p>这是 Vue 3 教程的首页。</p>
  </div>
</template>

<script setup>
// 这里可以导入其他组件或模块
import { ref, onMounted } from 'vue';

// 示例数据
const message = ref('Hello, Vue 3!');

// 生命周期钩子
onMounted(() => {
  console.log('Home component is mounted!');
});
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: #34495e;
}

p {
  font-size: 1.2em;
  color: #7f8c8d;
}
</style>
