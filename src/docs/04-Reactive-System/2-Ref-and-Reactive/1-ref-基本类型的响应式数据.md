# Vue 3 中 `ref` 创建：基本类型的响应式数据

## 作用

`ref` 用于定义响应式的基本类型变量。在 Vue 3 中，`ref` 是一个非常常用的工具，能够使基本数据类型（如字符串、数字、布尔值等）变得响应式。

## 语法

```js
let xxx = ref(初始值)
```

- `xxx`：是一个响应式的基本数据类型变量。
- `初始值`：是你希望赋给该响应式变量的初始值。

## 返回值

`ref` 会返回一个 `RefImpl` 实例对象，通常称为 `ref` 对象。`ref` 对象的 `value` 属性才是响应式的。通过操作 `value` 来更新数据，并触发视图更新。

## 注意点

1. **操作方式：** 在 JavaScript 中，我们需要通过 `.value` 来访问或修改 `ref` 对象的值。  
   例如：`name.value = '李四'`。

2. **模板中的简化使用：** 在 Vue 的模板中，直接使用 `name` 即可，不需要加 `.value`。  
   例如：`{{ name }}` 会自动读取 `name.value` 的值。

3. **对象本身不是响应式的：** 对于 `let name = ref('张三')`，`name` 本身不是响应式的，只有 `name.value` 才是响应式的。

## 示例代码

下面是一个示例，演示了如何使用 `ref` 定义响应式变量以及如何在代码中操作它们。

```vue
<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">年龄+1</button>
    <button @click="showTel">点我查看联系方式</button>
  </div>
</template>

<script setup lang="ts" name="Person">
  import { ref } from 'vue'
  
  // 定义响应式变量
  let name = ref('张三')
  let age = ref(18)
  
  // 普通变量，不是响应式的
  let tel = '13888888888'

  // 修改名字的方法
  function changeName() {
    // 需要通过.value访问和修改值
    name.value = '李四'
    console.log(name.value)

    // 如果直接修改name变量本身，并不会触发视图更新
    // name = ref('zhang-san') // 这样不会更新视图
  }

  // 增加年龄的方法
  function changeAge() {
    age.value += 1
    console.log(age.value)
  }

  // 显示电话的方法
  function showTel() {
    alert(tel)
  }
</script>
```

## 代码解析

1. **`ref('张三')` 和 `ref(18)`：**  
   `name` 和 `age` 是通过 `ref` 创建的响应式变量，其 `value` 属性会在数据变化时自动更新视图。

2. **模板中的数据绑定：**  
   在模板中，使用 `{{ name }}` 和 `{{ age }}` 来绑定变量，不需要显式使用 `.value`，Vue 会自动处理。

3. **修改变量值：**  
   使用 `.value` 修改响应式变量时，Vue 会触发视图的更新。例如，点击 "修改名字" 按钮会将 `name.value` 设置为 `李四`，视图会随之更新。

4. **注意：**  
   如果直接修改 `name` 变量本身（如：`name = ref('zhang-san')`），视图不会更新，因为 `name` 本身并不是响应式的。

通过上述方式，你可以轻松地使用 `ref` 创建和管理响应式数据，使得基本类型变量也能享受 Vue 的响应式特性。