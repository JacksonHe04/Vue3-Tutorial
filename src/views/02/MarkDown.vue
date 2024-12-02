<template>
  <div class="markdown-content" v-html="mdContent"></div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import mdContent from '/02-Vue-Basics/3-Template-Syntax（模板语法）/2-v-model.md';  // 导入md文件

const content = ref('');

onMounted(() => {
  content.value = mdContent;  // 赋值给ref变量，渲染到页面
});
</script>

<style setup>
@import '@/assets/markdown.scss';
.markdown-content {
  padding: 0 100px 0 400px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}
</style>
