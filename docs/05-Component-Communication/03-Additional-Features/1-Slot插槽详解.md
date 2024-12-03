# Vue 插槽使用详解

Vue 插槽是 Vue 组件的一种功能，允许父组件向子组件传递内容。插槽分为三种类型：默认插槽、具名插槽和作用域插槽，每种插槽的使用方式和适用场景有所不同。本文将详细介绍这三种插槽的使用方法和示例代码。

## 1. 默认插槽

默认插槽是最基本的插槽类型。当父组件没有传递任何插槽内容时，子组件中定义的插槽会显示默认内容。

### 示例：

#### 父组件：

```vue
<Category title="今日热门游戏">
  <ul>
    <li v-for="g in games" :key="g.id">{{ g.name }}</li>
  </ul>
</Category>
```

#### 子组件：

```vue
<template>
  <div class="item">
    <h3>{{ title }}</h3>
    <!-- 默认插槽 -->
    <slot></slot>
  </div>
</template>
```

在这个例子中，父组件向子组件传递了一个列表内容，而子组件通过默认插槽显示了这些内容。

## 2. 具名插槽

具名插槽允许父组件将内容插入到子组件中指定的插槽位置。通过 `v-slot` 指令，父组件可以命名插槽，子组件则需要使用带有 `name` 属性的 `<slot>` 标签。

### 示例：

#### 父组件：

```vue
<Category title="今日热门游戏">
  <template v-slot:s1>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
  </template>
  <template #s2>
    <a href="">更多</a>
  </template>
</Category>
```

#### 子组件：

```vue
<template>
  <div class="item">
    <h3>{{ title }}</h3>
    <slot name="s1"></slot>
    <slot name="s2"></slot>
  </div>
</template>
```

在这个例子中，父组件通过具名插槽将内容插入子组件的不同位置。`s1` 和 `s2` 插槽分别显示了游戏列表和“更多”链接。

## 3. 作用域插槽

作用域插槽允许子组件将一些数据传递给父组件，而父组件可以通过插槽访问这些数据。这使得父组件能够灵活地使用子组件提供的数据并决定如何展示。

### 理解：

数据在子组件中处理，但通过作用域插槽传递给父组件，父组件可以根据需要决定如何使用这些数据。这在处理动态内容时非常有用。

### 示例：

#### 父组件：

```vue
<Game v-slot="params">
  <ul>
    <li v-for="g in params.games" :key="g.id">{{ g.name }}</li>
  </ul>
</Game>
```

#### 子组件：

```vue
<template>
  <div class="category">
    <h2>今日游戏榜单</h2>
    <slot :games="games" a="哈哈"></slot>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

let games = reactive([
  {id: 'asgdytsa01', name: '英雄联盟'},
  {id: 'asgdytsa02', name: '王者荣耀'},
  {id: 'asgdytsa03', name: '红色警戒'},
  {id: 'asgdytsa04', name: '斗罗大陆'}
]);
</script>
```

在这个例子中，子组件通过作用域插槽将 `games` 数据传递给父组件，父组件可以根据需要来渲染游戏列表。父组件使用插槽时，可以访问到传递过来的 `games` 数据。

---

### 总结

- **默认插槽**：最基础的插槽方式，子组件展示传入的内容。
- **具名插槽**：允许父组件向指定的插槽插入不同的内容，适合有多个插槽需求的场景。
- **作用域插槽**：让父组件能够访问子组件提供的数据，并根据数据动态渲染内容，提供更高的灵活性。

了解和掌握这三种插槽的使用方式，可以帮助你在 Vue 中构建更灵活、可复用的组件。