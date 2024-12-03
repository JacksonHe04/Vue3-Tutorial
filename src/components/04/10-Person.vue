<template>
  <div class="person">
    <p>姓名: {{ name }}</p>
    <p>年龄: {{ age }}</p>
  </div>
</template>

<!-- 子组件Person.vue中要使用defineExpose暴露内容 -->
<script lang="ts" setup name="Person">
import { ref, defineExpose } from 'vue'
// 数据
let name = ref('Jackson')
let age = ref(20)
// 使用defineExpose将组件中的数据交给外部
defineExpose({ name, age })
</script>