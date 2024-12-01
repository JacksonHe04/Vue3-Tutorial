<!-- Couter.vue -->
<template>
  <div>
    <h2>计数器</h2>
    <p>当前计数: {{ count }}</p>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
    <button @click="setCount(10)">设置为 10</button>
  </div>
</template>

<script setup lang="ts">
import { useCountStore } from '@/store/count';
import {storeToRefs} from "pinia";

// 获取Pinia store
const countStore = useCountStore();
// 绑定store中的state和actions
const { increment, decrement, setCount } = countStore;
const { count } = storeToRefs(countStore)
</script>

<style scoped lang="scss">
$vue: #42b983;

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

  button {
    background-color: $vue;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: darken($vue, 10%);
    }
  }
}
</style>