# 使用 Pinia 实现组件间数据共享与响应式更新

在 Vue 3 中，通过使用 Pinia 状态管理库，可以在不同的组件之间实现数据的响应式共享。本示例展示了如何使用 Pinia 创建和管理共享的状态，并在多个组件中进行访问和操作。以下文档将逐步介绍如何实现这一过程。

## 1. 创建 Pinia Store

首先，我们需要创建一个 Pinia store，存储共享的数据及相关操作。

### `src/store/count.ts`

```typescript
import { defineStore } from 'pinia';

export const useCountStore = defineStore('count', {
  // state 定义共享的数据
  state: () => ({
    count: 0,
  }),
  
  // actions 定义对数据的修改方法
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    setCount(newCount: number) {
      this.count = newCount;
    },
  },
  
  // getters 定义计算属性（只读）
  getters: {
    doubleCount: (state) => state.count * 2,
  },
});
```

在这个 store 中，我们做了以下几个操作：

- **state**: 用来存储共享的数据，`count` 初始化为 0。
- **actions**: 定义了可以修改 `count` 的方法，如 `increment`、`decrement` 和 `setCount`。
- **getters**: 定义了计算属性 `doubleCount`，它返回 `count` 的双倍值，`getters` 是只读的，可以方便地进行派生计算。

## 2. 在组件中使用 Pinia Store

### `Couter.vue`

这个组件将会显示计数器的当前值，并提供操作按钮来增加、减少或设置计数值。

```vue
<template>
  <div>
    <h2>计数器</h2>
    <p>当前计数: {{ countStore.count }}</p>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
    <button @click="setCount(10)">设置为 10</button>
  </div>
</template>

<script setup lang="ts">
import { useCountStore } from '@/store/count';

// 获取 Pinia store
const countStore = useCountStore();

// 绑定 store 中的 state 和 actions
const { count, increment, decrement, setCount } = countStore;
</script>
```

### 解释

- 在 `Couter.vue` 组件中，我们使用 `useCountStore` 函数获取 Pinia store 的实例 `countStore`，并通过解构赋值将 store 中的 `state` 和 `actions` 绑定到组件中。
- 通过模板绑定，组件会自动响应 `count` 的变化，实时显示计数值。
- 通过点击按钮调用 `increment`、`decrement` 或 `setCount(10)` 方法，可以修改 `count` 的值。

### `DoubleCounter.vue`

此组件展示了如何使用 `getters` 获取派生数据，并监听 `count` 的变化。

```vue
<template>
  <div>
    <h2>双倍计数</h2>
    <p>当前双倍计数: {{ countStore.doubleCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { useCountStore } from '@/store/count';
import { watch } from "vue";

// 获取 Pinia store
const countStore = useCountStore();

// 监听 count 的变化
watch(() => countStore.count, (newVal) => {
  console.log('Count changed:', newVal);
});
</script>
```

### 解释

- 在 `DoubleCounter.vue` 组件中，我们使用 `countStore.doubleCount` 来访问 `count` 的双倍值。
- 通过 `watch` API，我们监听 `count` 的变化，每当 `count` 改变时，都会触发回调函数并打印新的值。

## 3. 响应式数据共享

在这个示例中，`countStore.count` 是响应式的，这意味着：

- 当 `Couter.vue` 中的计数值改变时，`DoubleCounter.vue` 中的 `doubleCount` 也会自动更新。
- 组件间的数据共享是通过 Pinia store 实现的，无论是通过 `state`、`actions` 还是 `getters`，不同组件之间的数据始终保持同步。

## 4. 总结

通过使用 Pinia 管理应用的全局状态，我们可以轻松地实现组件间的响应式数据共享。在本示例中：

- 我们创建了一个 `count` 状态，并通过 `increment`、`decrement` 和 `setCount` 方法修改它。
- 在不同的组件中，使用 Pinia store 获取数据并响应式地更新视图。
- `getters` 可以派生数据，简化了计算逻辑。
- 使用 `watch` 监听数据变化，做出相应的操作。

Pinia 提供了强大的状态管理功能，使得在 Vue 3 中共享和管理数据变得简单而高效。