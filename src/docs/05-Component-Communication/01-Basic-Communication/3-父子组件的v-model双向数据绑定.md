# 【v-model】

## 1. 概述

`v-model` 是 Vue.js 提供的一个指令，用于在父组件和子组件之间实现双向数据绑定。它使得父子组件之间能够相互通信，父组件的数据可以传递给子组件，子组件的数据也能反馈给父组件。其本质上是通过 `:value` 和 `@input` 实现的双向绑定。

## 2. 前序知识 —— `v-model` 的本质

在 Vue 中，`v-model` 语法糖本质上是以下两行代码的组合：

```vue
<!-- 使用v-model指令 -->
<input type="text" v-model="userName">

<!-- v-model的本质是下面这行代码 -->
<input 
  type="text" 
  :value="userName" 
  @input="userName =(<HTMLInputElement>$event.target).value"
>
```

- `:value="userName"`：将父组件中的 `userName` 作为值绑定到子组件。
- `@input="userName = $event.target.value"`：监听 `input` 事件，并将输入框的值传递回父组件。

通过这两者的配合，形成了父子组件间的数据流通。

## 3. 组件标签上的 `v-model` 的本质

当 `v-model` 用于组件时，Vue 会将其转换为 `:modelValue` 和 `@update:modelValue` 事件，形成父子组件之间的双向绑定。

### 示例：在父组件中使用 `v-model` 指令

```vue
<!-- 组件标签上使用v-model指令 -->
<AtguiguInput v-model="userName"/>
```

### 组件内部的本质

```vue
<!-- 组件标签上v-model的本质 -->
<AtguiguInput :modelValue="userName" @update:model-value="userName = $event"/>
```

在 `AtguiguInput` 组件中：

```vue
<template>
  <div class="box">
    <!-- 将接收的 modelValue 赋给 input 元素的 value 属性，目的是为了呈现数据 -->
    <input 
      type="text" 
      :value="modelValue" 
      @input="emit('update:model-value', $event.target.value)"
    >
  </div>
</template>

<script setup lang="ts" name="AtguiguInput">
  // 接收 props
  defineProps(['modelValue'])
  
  // 声明事件
  const emit = defineEmits(['update:model-value'])
</script>
```

### 解释：

- `:modelValue="userName"`：父组件传递 `userName` 数据给子组件。
- `@update:model-value="userName = $event"`：子组件通过 `emit` 触发 `update:model-value` 事件，将输入框的值传递回父组件，更新父组件中的 `userName`。

## 4. 更换 `value`，例如改成 `abc`

你还可以在 `v-model` 中指定不同的绑定名称，而不仅仅是 `modelValue`。例如：

```vue
<!-- 使用v-model:abc替换v-model -->
<AtguiguInput v-model:abc="userName"/>
```

### 组件内部的本质

```vue
<!-- 上面代码的本质如下 -->
<AtguiguInput :abc="userName" @update:abc="userName = $event"/>
```

在 `AtguiguInput` 组件中：

```vue
<template>
  <div class="box">
    <input 
      type="text" 
      :value="abc" 
      @input="emit('update:abc', $event.target.value)"
    >
  </div>
</template>

<script setup lang="ts" name="AtguiguInput">
  // 接收props
  defineProps(['abc'])
  
  // 声明事件
  const emit = defineEmits(['update:abc'])
</script>
```

### 解释：

- `:abc="userName"`：父组件传递 `userName` 数据给子组件，绑定到 `abc` 上。
- `@update:abc="userName = $event"`：子组件通过 `emit` 触发 `update:abc` 事件，将输入框的值传递回父组件，更新 `userName`。

## 5. 多次使用 `v-model`

`v-model` 不仅可以用一个属性绑定，还可以用于多个属性。通过为每个属性指定不同的 `v-model` 语法（如 `v-model:abc` 和 `v-model:xyz`），你可以实现多个数据的双向绑定。

```vue
<!-- 在组件上使用多个v-model指令 -->
<AtguiguInput v-model:abc="userName" v-model:xyz="password"/>
```

在 `AtguiguInput` 组件中：

```vue
<template>
  <div class="box">
    <input 
      type="text" 
      :value="abc" 
      @input="emit('update:abc', $event.target.value)"
    >
    <input 
      type="password" 
      :value="xyz" 
      @input="emit('update:xyz', $event.target.value)"
    >
  </div>
</template>

<script setup lang="ts" name="AtguiguInput">
  // 接收props
  defineProps(['abc', 'xyz'])
  
  // 声明事件
  const emit = defineEmits(['update:abc', 'update:xyz'])
</script>
```

### 解释：

- `v-model:abc="userName"`：为 `userName` 绑定 `abc`，实现双向绑定。
- `v-model:xyz="password"`：为 `password` 绑定 `xyz`，实现双向绑定。

这样，父组件可以同时管理多个双向绑定的属性。

## 总结

- `v-model` 是 Vue 中用于实现父子组件之间双向数据绑定的指令。
- `v-model` 的本质是 `:value` 和 `@input` 事件的组合，可以方便地将数据从父组件传递给子组件，并将子组件的数据更新反馈给父组件。
- 你可以使用 `v-model` 来绑定多个属性，只需要在组件上使用不同的 `v-model:[name]` 语法即可。