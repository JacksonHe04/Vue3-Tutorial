# Vue 3 中的 `setup` 概述

## `setup` 概述
在 `Vue 3` 中，`setup` 是一个新的配置项，它是 `Composition API` 中的核心概念。`setup` 是一个函数，在组件创建之前执行，作用是为组件提供响应式数据、计算属性、方法等逻辑。它作为组件逻辑的“舞台”，管理着组件的内部状态，并且返回一个对象，这个对象中的属性和方法可以直接在模板中使用。

### 特点：
- `setup` 返回的对象中的数据、方法等可以直接在模板中使用。
- 在 `setup` 中访问 `this` 时，会得到 `undefined`，因为它不再指向组件实例。
- `setup` 函数在 `beforeCreate` 钩子之前调用，它是组件初始化过程中最早执行的函数。

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

<script lang="ts">
  export default {
    name: 'Person',
    setup() {
      // 数据，原来写在 data 中（注意：此时的 name、age、tel 数据并不是响应式的）
      let name = '张三'
      let age = 18
      let tel = '13888888888'

      // 方法，原来写在 methods 中
      function changeName() {
        name = '张三' // 此时修改 name 页面不会更新
        console.log(name)
      }
      function changeAge() {
        age += 1 // 此时修改 age 页面不会更新
        console.log(age)
      }
      function showTel() {
        alert(tel)
      }

      // 返回一个对象，对象中的内容，模板中可以直接使用
      return { name, age, tel, changeName, changeAge, showTel }
    }
  }
</script>
```

## `setup` 的返回值

- **返回一个对象**：对象中的属性、方法等都会被暴露到模板中，可以直接在模板中引用。
- **返回一个函数**：如果返回一个函数，则该函数会用作渲染函数，返回的内容可以自定义组件的渲染内容。例如：

```jsx
setup() {
  return () => '你好啊！'
}
```

## `setup` 与 `Options API` 的关系

- 在 `Vue 2` 中，组件的 `data`、`methods` 等配置项可以访问到 `setup` 中的属性和方法。
- 但是在 `setup` 中，不能访问到 `Vue 2` 的配置项，如 `data`、`methods` 等。
- 如果 `setup` 中的某些内容与 `Vue 2` 的配置项冲突，那么 `setup` 中的内容优先。

## `setup` 语法糖

在 Vue 3 中，`setup` 还支持语法糖。我们可以通过一个简化的写法，将 `setup` 函数独立出来，使代码更加简洁：

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

<script lang="ts">
  export default {
    name: 'Person',
  }
</script>

<!-- 使用 setup 语法糖 -->
<script setup lang="ts">
  // 数据
  let name = '张三'
  let age = 18
  let tel = '13888888888'

  // 方法
  function changeName() {
    name = '李四' // 注意：此时修改 name 页面不会变化
  }
  function changeAge() {
    age += 1 // 注意：此时修改 age 页面不会变化
  }
  function showTel() {
    alert(tel)
  }
</script>
```

通过上述代码，可以看到 `setup` 语法糖使得我们不再需要显式地在 `script` 中定义组件名，直接在 `<script setup>` 中进行配置。这样，代码看起来更加简洁。

### 扩展：使用 `vite` 插件简化组件名指定

为了更方便地使用 `setup` 语法糖，我们可以通过 `vite` 插件来简化组件名称的指定。步骤如下：

1. 安装插件：
   ```bash
   npm i vite-plugin-vue-setup-extend -D
   ```

2. 在 `vite.config.ts` 中配置插件：
   ```javascript
   import { defineConfig } from 'vite'
   import VueSetupExtend from 'vite-plugin-vue-setup-extend'

   export default defineConfig({
     plugins: [VueSetupExtend()]
   })
   ```

3. 在组件中直接指定 `name` 属性：
   ```vue
   <script setup lang="ts" name="Person">
     // 数据和方法...
   </script>
   ```

这样，你就可以在使用 `setup` 语法糖的同时，不再需要额外的 `<script>` 标签来指定组件名称，提升了开发效率。