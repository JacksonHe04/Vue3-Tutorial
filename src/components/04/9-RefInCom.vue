<!-- 父组件App.vue -->
<template>
  <div class="person">
    <h1>ref用于子组件标签</h1>
    <h2>父组件</h2>
    <Person ref="ren" />
    <button @click="print">打印子组件</button>
  </div>
</template>

<script lang="ts" setup>
import Person from "./10-Person.vue";
import { ref } from "vue";

let ren = ref();
function print() {
  console.log(ren.value.name);
  console.log(ren.value.age);
}
</script>
