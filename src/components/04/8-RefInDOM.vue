<template>
  <div class="person">
    <h1>ref用于获取DOM节点</h1>
    <h1 id="title1" ref="title1">前端开发</h1>
    <h2 id="title2" ref="title2">Vue.js</h2>
    <h3 id="title3" ref="title3">Ref-DOM</h3>
    <input type="text" id="inpt" ref="inpt" /> <br /><br />
    <button @click="showLog">打印卡片</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let title1 = ref(null);
let title2 = ref(null);
let title3 = ref(null);
let inpt = ref(null);

function showLog() {
  // 打印通过 ref 获取的 DOM 节点
  console.log(title1.value);
  console.log(title2.value);
  console.log(title3.value.innerText);
  console.log(inpt.value?.value); // 访问 input 的 value 属性

  // 打印通过 getElementById 获取的 DOM 节点
  const t1 = document.getElementById("title1");
  console.log(t1?.innerText);
  const t2 = document.getElementById("title2");
  console.log(t2?.innerText);
  const t3 = document.getElementById("title3");
  console.log(t3?.innerText);
  const ipt = document.getElementById("inpt") as HTMLInputElement;
  console.log(ipt?.value);
}
</script>
