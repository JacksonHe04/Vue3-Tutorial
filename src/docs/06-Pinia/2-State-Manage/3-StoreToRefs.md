# storeToRefs

在 Pinia 中，`storeToRefs` 是一个非常实用的工具，它可以将 `store` 中的状态转为 Vue 的 `ref` 对象，方便在模板中进行绑定和使用。这使得在组件中使用 `store` 状态时，能够更轻松地响应状态变化。

## 使用 `storeToRefs` 转换 `store` 数据

通过 `storeToRefs`，您可以将 Pinia `store` 中的状态转换成 `ref`，然后在模板中直接使用这些 `ref` 值，而无需使用 `.value` 语法。

### 示例代码

```vue
<template>
  <div class="count">
    <h2>当前求和为：{{ sum }}</h2>
  </div>
</template>

<script setup lang="ts" name="Count">
  import { useCountStore } from '@/store/count'
  /* 引入 storeToRefs */
  import { storeToRefs } from 'pinia'

  /* 得到 countStore */
  const countStore = useCountStore()
  /* 使用 storeToRefs 转换 countStore，随后解构 */
  const { sum } = storeToRefs(countStore)
</script>
```

### 说明

1. **`storeToRefs` 的作用**：它将 `countStore` 中的状态转为 `ref`，使得您可以在模板中直接使用它们。例如，`sum` 就变成了一个 `ref`，在模板中不需要 `.value`。
2. **解构后的效果**：解构 `storeToRefs(countStore)` 后，您可以直接使用 `sum`，而无需显式地访问 `sum.value`，使模板更简洁。

## 注意事项

- `storeToRefs` 仅转换 `store` 中的状态，而 Vue 的 `toRefs` 是用来转换 `reactive` 对象的。
- 这种方式适用于当你希望直接将 `store` 的数据绑定到模板时，避免每次访问数据时都使用 `.value`。

## 小结

`storeToRefs` 是在 Pinia 中非常方便的工具，它简化了模板中的数据访问，使得 Vue 组件中的状态使用更加流畅和自然。