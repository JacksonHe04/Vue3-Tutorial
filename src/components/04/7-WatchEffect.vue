<template>
  <div class="person">
    <h1>需求：水温达到50℃，或水位达到20cm，则联系服务器</h1>
    <h2 id="demo">水温：{{ temp }}</h2>
    <h2>水位：{{ height }}</h2>
    <button @click="changePrice">水温+10</button>
    <button @click="changeSum">水位+1</button>
    <button @click="reset">重置</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { ref, watch, watchEffect } from 'vue';

// 数据
let temp = ref(0);
let height = ref(0);

// 方法
function changePrice() {
  temp.value += 10;
}

function changeSum() {
  height.value += 1;
}

function reset() {
  temp.value = 0;
  height.value = 0;
}

// 使用 watch 监听：需要明确指出要监视的数据
watch([temp, height], (value) => {
  // 从 value 中获取最新的 temp 值、height 值
  const [newTemp, newHeight] = value;
  // 室温达到50℃，或水位达到20cm，立刻联系服务器
  if (newTemp >= 50 || newHeight >= 20) {
    console.log('联系工作人员');
  }
});

// 使用 watchEffect 监听：不需要明确指出要监视的数据
const stopWtach = watchEffect(() => {
  // 室温达到50℃，或水位达到20cm，立刻联系服务器
  if (temp.value >= 50 || height.value >= 20) {
    console.log(document.getElementById('demo')?.innerText);
    console.log('联系工作人员');
  }
  // 水温达到100，或水位达到50，取消监视
  if (temp.value === 100 || height.value === 50) {
    console.log('清理了');
    stopWtach();  // 停止 watchEffect
  }
});
</script>