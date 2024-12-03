# 自定义 Hook

在 Vue 3 中，`hook` 是一个函数，它封装了 `setup` 函数中使用的 Composition API。自定义 `hook` 主要目的是为了复用代码、提高可维护性，并使 `setup` 中的逻辑更加清晰易懂。自定义 `hook` 的思想类似于 Vue 2.x 中的 `mixin`，但更加灵活和清晰。

## 什么是 `hook`？

`hook` 本质上是一个普通的 JavaScript 函数，它可以在 `setup` 中使用并返回响应式的数据或方法。`hook` 允许我们将某些逻辑或功能抽象成一个函数，便于在多个组件之间复用。

## 自定义 `hook` 的优势

- **复用代码**：通过抽象逻辑到独立的 `hook` 中，可以在不同的组件之间复用代码，避免重复编写相似的逻辑。
- **提高代码清晰度**：将复杂的逻辑拆分成多个自定义 `hook`，让每个 `setup` 函数中的逻辑更加简洁和易于理解。
- **解耦**：将与组件功能无关的逻辑提取到 `hook` 中，使得组件更加专注于其展示和交互功能。

## 示例代码

### 示例 1: `useSum.ts`

这个示例展示了一个简单的 `hook`，它管理一个数字的加减操作。

```ts
import { ref, onMounted } from 'vue'

export default function() {
  let sum = ref(0)

  const increment = () => {
    sum.value += 1
  }
  
  const decrement = () => {
    sum.value -= 1
  }

  // 在组件挂载时自动增加 1
  onMounted(() => {
    increment()
  })

  // 向外部暴露数据和方法
  return { sum, increment, decrement }
}
```

### 示例 2: `useDog.ts`

这个示例展示了如何使用 `hook` 来获取并展示狗狗图片数据。

```ts
import { reactive, onMounted } from 'vue'
import axios, { AxiosError } from 'axios'

export default function() {
  let dogList = reactive<string[]>([])

  // 方法：请求随机狗狗图片
  async function getDog() {
    try {
      let { data } = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
      dogList.push(data.message)
    } catch (error) {
      const err = <AxiosError>error
      console.log(err.message)
    }
  }

  // 在组件挂载时获取狗狗图片
  onMounted(() => {
    getDog()
  })

  // 向外部暴露数据和方法
  return { dogList, getDog }
}
```

## 在组件中使用自定义 `hook`

在 Vue 3 中使用自定义 `hook` 时，我们可以通过 `import` 引入并在 `setup` 函数中调用它。以下是一个组件使用多个 `hook` 的示例：

```vue
<template>
  <h2>当前求和为：{{ sum }}</h2>
  <button @click="increment">点我+1</button>
  <button @click="decrement">点我-1</button>
  <hr>
  <img v-for="(u, index) in dogList" :key="index" :src="u"> 
  <span v-show="dogList.isLoading">加载中......</span><br>
  <button @click="getDog">再来一只狗</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<script setup lang="ts">
import useSum from './hooks/useSum'
import useDog from './hooks/useDog'

let { sum, increment, decrement } = useSum()
let { dogList, getDog } = useDog()
</script>
```

## 总结

自定义 `hook` 是 Vue 3 中提升代码复用性和清晰度的有力工具。通过将组件中常用的逻辑抽离到独立的 `hook` 中，既能减少代码冗余，又能提升代码的可维护性和可读性。