<!-- DoubleCounter.vue -->
<template>
  <div>
    <h2>双倍计数</h2>
    <p>当前双倍计数: {{ doubleCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { useCountStore } from '@/store/count';
import {storeToRefs} from "pinia";

// 获取Pinia store
const countStore = useCountStore();
const { doubleCount } = storeToRefs(countStore)
</script>

<style scoped lang="scss">
div {
  text-align: center;
  margin-top: 20px;

  h2 {
    color: $vue;
  }

  p {
    font-size: 1.2em;
    margin: 10px 0;
  }
}
</style>
