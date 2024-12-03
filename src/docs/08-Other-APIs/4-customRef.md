# `customRef` 的使用

`customRef` 是 Vue 3 中提供的一个 API，允许开发者创建自定义的响应式引用。这种引用提供了更多的控制权，特别是在对响应式数据的依赖项跟踪和更新触发进行逻辑控制时。`customRef` 允许你自定义对数据的响应式处理，比如实现防抖、节流等优化。

## 作用
`customRef` 使得开发者可以控制当数据变化时如何触发更新，它提供了 `get` 和 `set` 方法，允许你在数据访问和修改时加入额外的逻辑。

### 防抖效果实现

通过 `customRef` 创建一个具有防抖效果的响应式引用。以下是一个示例代码，它展示了如何用 `customRef` 实现一个带有防抖效果的 `msg` 引用。

```typescript
import { customRef } from "vue";

export default function useSumRef(initValue: string, delay: number) {
  let msg = customRef((track, trigger) => {
    let timer: number;

    return {
      get() {
        track(); // 告诉 Vue 这个数据很重要，需要持续关注，一旦变化就更新
        return initValue;
      },
      set(value) {
        clearTimeout(timer); // 每次设置新值时，清除上一个定时器
        timer = setTimeout(() => {
          initValue = value; // 更新值
          trigger(); // 通知 Vue 数据已更新
        }, delay); // 延时后触发更新
      }
    };
  });

  return { msg };
}
```

### 组件中使用

在组件中使用自定义 `ref` 时，只需要调用 `useSumRef` 函数并传入初始值和延迟时间即可。

```vue
<template>
  <div>
    <input v-model="msg" placeholder="请输入内容" />
    <p>当前输入：{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useSumRef from "./useSumRef";

export default defineComponent({
  setup() {
    const { msg } = useSumRef("初始值", 500); // 500ms 的防抖延迟

    return { msg };
  }
});
</script>
```

## 解释

### `customRef` 详细解析
1. `customRef` 接收一个工厂函数，该函数有两个参数：`track` 和 `trigger`。`track` 用于标记数据依赖，`trigger` 用于触发视图更新。
2. `get` 方法用于获取数据，并通过 `track()` 告诉 Vue 该数据需要被观察，一旦其值发生变化，视图需要更新。
3. `set` 方法用于修改数据。通过 `clearTimeout` 和 `setTimeout` 结合防抖逻辑，确保在用户停止输入一段时间后才触发更新。

### 防抖效果
- 每次用户输入时，会重置 `setTimeout`，只有在输入停止超过设定的时间（`delay`）后，数据才会真正更新。
- 防止频繁更新，尤其在处理用户输入、搜索建议等场景中非常有用。

## 总结

- **`customRef`** 允许开发者对响应式引用的 `get` 和 `set` 操作进行自定义，实现更细粒度的控制。
- **防抖效果**：在用户输入过程中避免频繁更新，提升性能。
- 适用于需要更复杂逻辑处理的响应式数据，如防抖、节流、异步操作等。