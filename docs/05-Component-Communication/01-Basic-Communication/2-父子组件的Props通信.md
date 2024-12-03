# Vue 3 中的 `props` 详解

## 概述

在 Vue 3 中，`props` 是一种常用的组件通信方式，用于实现父子组件之间的数据传递。通常，`props` 的使用场景分为两种：

1. **父传子**：父组件通过 `props` 将数据传递给子组件，子组件通过接收 `props` 来使用父组件的数据。
2. **子传父**：子组件通过触发事件并将数据传递给父组件，父组件通过方法来接收数据。

### 父传子与子传父的区别

- **父传子**：父组件将数据通过非函数形式传递给子组件，子组件通过 `props` 接收这些数据。
- **子传父**：子组件通过触发一个函数形式的 `prop`，把数据传递给父组件，父组件通过方法接收数据。

## 示例

下面我们通过一个简单的示例来展示父子组件如何使用 `props` 来实现数据传递。

### 父组件

在父组件中，我们定义了一个名为 `car` 的数据，代表父组件给子组件传递的车的信息。父组件还定义了一个方法 `getToy`，用于接收子组件传递回来的玩具数据。

```vue
<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>我的车：{{ car }}</h4>
    <h4>儿子给的玩具：{{ toy }}</h4>
    <Child :car="car" :getToy="getToy"/>
  </div>
</template>

<script setup lang="ts" name="Father">
  import Child from './Child.vue'
  import { ref } from "vue";
  
  // 数据
  const car = ref('奔驰')
  const toy = ref()
  
  // 方法：子组件传递玩具数据
  function getToy(value: string) {
    toy.value = value
  }
</script>
```

### 子组件

子组件通过 `defineProps` 接收来自父组件的数据。子组件中有一个名为 `toy` 的数据，表示子组件自己的玩具。当子组件中的按钮被点击时，子组件会通过调用 `getToy` 函数将玩具数据传递给父组件。

```vue
<template>
  <div class="child">
    <h3>子组件</h3>
    <h4>我的玩具：{{ toy }}</h4>
    <h4>父给我的车：{{ car }}</h4>
    <button @click="getToy(toy)">玩具给父亲</button>
  </div>
</template>

<script setup lang="ts" name="Child">
  import { ref } from "vue";

  // 子组件自己的玩具数据
  const toy = ref('奥特曼')

  // 接收父组件的 props
  defineProps(['car', 'getToy'])
</script>
```

## 总结

- **父传子**：父组件通过 `props` 将数据传递给子组件，子组件通过 `defineProps` 接收。
- **子传父**：子组件通过函数形式的 `props` 将数据传递给父组件，父组件通过方法接收数据。

这种方式可以帮助我们实现父子组件之间的有效通信，确保数据的流动和功能的交互。