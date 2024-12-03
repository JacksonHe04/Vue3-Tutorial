# Vue 3 中的 `watchEffect`

`watchEffect` 是 Vue 3 中用于响应式编程的一个函数，它会立即执行一次给定的回调函数，并自动追踪函数中访问的响应式数据。一旦这些数据发生变化，回调函数就会重新执行。`watchEffect` 提供了一种无需显式指定依赖的方式，适合用于自动追踪依赖并执行操作。

## **`watch` vs `watchEffect`**

### **1. 共同点**
- `watch` 和 `watchEffect` 都可以监听响应式数据的变化。

### **2. `watch`**
- `watch` 需要显式指定需要监听的数据，通常用于监听一个或多个响应式数据的变化，并在这些数据变化时触发回调。
- 使用 `watch` 时，你需要提供数据源和回调函数，并且手动处理依赖。

### **3. `watchEffect`**
- `watchEffect` 不需要显式指定需要监听的数据。它会自动追踪回调函数中访问的响应式数据。
- 当这些数据变化时，`watchEffect` 会自动重新执行回调函数。

### **总结对比**

| 特性            | `watch`                       | `watchEffect`                              |
|-----------------|-------------------------------|--------------------------------------------|
| 依赖的指定方式  | 需要手动指定监视的数据        | 自动追踪函数中用到的响应式数据           |
| 触发的方式      | 当指定的响应式数据变化时触发  | 当函数中用到的响应式数据变化时触发       |
| 适用场景        | 用于复杂的依赖关系或当依赖较少时 | 适用于简单的响应式追踪和自动重执行场景  |

## **示例代码**

以下是一个 `watchEffect` 和 `watch` 的示例，展示它们如何监听 `temp`（水温）和 `height`（水位）的变化，并在满足条件时联系服务器。

### **Vue 模板和代码实现**

```vue
<template>
  <div class="person">
    <h1>需求：水温达到50℃，或水位达到20cm，则联系服务器</h1>
    <h2 id="demo">水温：{{ temp }}</h2>
    <h2>水位：{{ height }}</h2>
    <button @click="changePrice">水温+1</button>
    <button @click="changeSum">水位+10</button>
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

  // 使用 watch 监听：需要明确指出要监视的数据
  watch([temp, height], (value) => {
    // 从 value 中获取最新的 temp 值、height 值
    const [newTemp, newHeight] = value;
    // 室温达到50℃，或水位达到20cm，立刻联系服务器
    if (newTemp >= 50 || newHeight >= 20) {
      console.log('联系服务器');
    }
  });

  // 使用 watchEffect 监听：不需要明确指出要监视的数据
  const stopWtach = watchEffect(() => {
    // 室温达到50℃，或水位达到20cm，立刻联系服务器
    if (temp.value >= 50 || height.value >= 20) {
      console.log(document.getElementById('demo')?.innerText);
      console.log('联系服务器');
    }
    // 水温达到100，或水位达到50，取消监视
    if (temp.value === 100 || height.value === 50) {
      console.log('清理了');
      stopWtach();  // 停止 watchEffect
    }
  });
</script>
```

### **解释**
1. **watch**:
    - 在 `watch` 中，我们手动指定了需要监听的响应式数据 `temp` 和 `height`。当这两个数据中的任何一个变化时，回调函数就会执行，并检查是否满足联系服务器的条件。

2. **watchEffect**:
    - 在 `watchEffect` 中，我们没有显式指定监视哪些数据。`watchEffect` 会自动追踪在回调函数中用到的 `temp` 和 `height`，并在这些数据变化时自动重新执行回调。
    - 在回调中，当水温达到 100℃ 或水位达到 50cm 时，我们通过 `stopWtach()` 停止了 `watchEffect` 的监听。

## **应用场景**
- `watchEffect` 适用于那些不需要明确指定依赖关系的简单场景，尤其是当你希望自动追踪函数内部访问的响应式数据时。
- `watch` 更适用于复杂场景，特别是当你需要监听多个不同的数据源，或需要有选择性地监听数据时。

通过合理选择这两者，你可以在 Vue 3 中更高效地管理响应式数据和副作用。