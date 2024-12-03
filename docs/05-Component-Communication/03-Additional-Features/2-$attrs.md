# `$attrs` 详解

## 概述

`$attrs` 是 Vue 3 中用于实现父组件向当前组件的传递属性的一种机制。它帮助实现**父组件**与**子组件**（甚至是跨层级的孙组件）之间的通信。特别是在子组件没有显式声明某些属性时，父组件传递的属性会被保存在 `$attrs` 中，方便子组件通过 `$attrs` 继续将这些属性传递给更深层次的子组件。

### 使用场景
- 当父组件需要向孙组件传递属性时，但子组件不需要或不关心这些属性时，可以利用 `$attrs` 来“自动转发”这些属性。

## 具体说明

`$attrs` 是一个包含父组件传入的所有属性的对象。它包括：
- 父组件传入的普通 HTML 特性（如 `id`, `class`）。
- 绑定到子组件的属性和事件，但排除了子组件已经通过 `props` 声明的属性。

### 注意事项
- `$attrs` 会自动排除在子组件中通过 `props` 声明的属性，这些属性在子组件中已被“消费”，因此不会出现在 `$attrs` 中。
- `$attrs` 主要用于将父组件传递的未被子组件声明的属性继续传递给下层组件。

## 示例

以下是一个具体示例，展示了如何通过 `$attrs` 实现父组件向孙组件的属性传递。

### 父组件

父组件通过 `v-bind` 向子组件传递了一些属性。

```vue
<template>
  <div class="father">
    <h3>父组件</h3>
    <Child :a="a" :b="b" :c="c" :d="d" v-bind="{x:100, y:200}" :updateA="updateA"/>
  </div>
</template>

<script setup lang="ts" name="Father">
  import Child from './Child.vue'
  import { ref } from "vue";
  
  // 定义属性
  let a = ref(1)
  let b = ref(2)
  let c = ref(3)
  let d = ref(4)

  // 更新属性的函数
  function updateA(value){
    a.value = value
  }
</script>
```

### 子组件

子组件通过 `$attrs` 将接收到的属性转发给孙组件。此时，`$attrs` 会包含父组件传递给子组件但没有声明在 `props` 中的属性。

```vue
<template>
  <div class="child">
    <h3>子组件</h3>
    <GrandChild v-bind="$attrs"/>
  </div>
</template>

<script setup lang="ts" name="Child">
  import GrandChild from './GrandChild.vue'
</script>
```

### 孙组件

孙组件通过 `defineProps` 显式声明它将接收到的属性，然后可以访问这些属性。通过 `$attrs` 转发的属性可以直接在孙组件中使用。

```vue
<template>
  <div class="grand-child">
    <h3>孙组件</h3>
    <h4>a：{{ a }}</h4>
    <h4>b：{{ b }}</h4>
    <h4>c：{{ c }}</h4>
    <h4>d：{{ d }}</h4>
    <h4>x：{{ x }}</h4>
    <h4>y：{{ y }}</h4>
    <button @click="updateA(666)">点我更新A</button>
  </div>
</template>

<script setup lang="ts" name="GrandChild">
  defineProps(['a', 'b', 'c', 'd', 'x', 'y', 'updateA'])
</script>
```

### 总结

1. `$attrs` 用于获取父组件传递给当前组件但没有在 `props` 中声明的属性。
2. `$attrs` 能够将父组件的属性继续传递到子组件、孙组件等下层组件。
3. 这种机制非常有用，尤其是当你希望子组件不关心某些属性，仅作为中间层将其传递下去时。