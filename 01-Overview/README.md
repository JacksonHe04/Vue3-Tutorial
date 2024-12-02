# **Vue 3 概览**

Vue 3 是一款轻量级、高效的前端框架，为开发者提供声明式渲染、组件化开发、响应式数据绑定等现代化开发工具。它结合了简单易用的 API 和强大的性能优化，是构建用户界面的理想选择。

---

## **Vue 3 简介**

`Vue 3` 于 **2020年9月18日** 正式发布，代号为 **`One Piece`**，代表了 Vue 框架的一次重要升级。其发展历程充满了开源社区的努力与智慧：

- **提交数**：超过 [4800 次提交](https://github.com/vuejs/core/commits/main)。
- **提案审议**：完成 [40 多个 RFC](https://github.com/vuejs/rfcs/tree/master/active-rfcs)。
- **代码贡献**：合并了 [600 多次 PR](https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged+-author%3Aapp%2Fdependabot-preview+)。
- **贡献者**：300 多位社区开发者参与了贡献。
- **发布地址**：[Release v3.0.0 One Piece · vuejs/core](https://github.com/vuejs/core/releases/tag/v3.0.0)。
- **最新版本**：截至 2023 年 10 月，`Vue 3` 的最新公开版本为 **`3.3.4`**。

---

## **Vue 3 的性能提升**

Vue 3 在性能上做出了显著优化，使得开发者能够以更高效的方式构建复杂的应用：

- **打包大小减少**：相比 Vue 2，减少了 **41%**。
- **初次渲染速度**：提高了 **55%**。
- **更新渲染速度**：提高了 **133%**。
- **内存占用**：减少了 **54%**。

这些改进使 Vue 3 在性能上处于前端框架的领先地位。

---

## **源码升级**

Vue 3 的核心源码经历了重构，引入现代 JavaScript 特性，为开发者带来更灵活、更高效的开发体验：

- **响应式系统**：
  - 使用 `Proxy` 替代 Vue 2 中的 `Object.defineProperty`。
  - 提高了响应式性能，支持动态属性添加和删除。
- **虚拟 DOM 的优化**：
  - 重写了虚拟 DOM 的实现，进一步提升渲染效率。
- **支持 Tree-Shaking**：
  - 通过模块化设计，按需加载功能，减少最终打包体积。

---

## **拥抱 TypeScript**

`Vue 3` 对 `TypeScript` 的支持更加完善，开发者可以更轻松地编写类型安全的代码。具体改进包括：

- 提供全面的类型定义文件。
- `Composition API` 的使用使得类型推导更直观。
- 增强了对 IDE（如 VSCode）的支持，带来更好的开发体验。

---

## **Vue 3 的新特性**

### [1. Composition API（组合式 API）](../03-Composition-API/README.md)


`Composition API` 提供了一种全新的方式来组织和复用代码，是 Vue 3 最具代表性的特性之一。核心概念包括：

- **`setup` 函数**：用来替代 `data`、`methods`、`computed` 等选项，可以在一个地方集中管理逻辑。
- **`ref` 与 `reactive`**：
  - `ref`：用于定义基本类型的响应式数据。
  - `reactive`：用于定义复杂对象的响应式数据。
- **`computed` 与 `watch`**：
  - `computed`：定义计算属性。
  - `watch`：监听响应式数据的变化，执行副作用。

#### 示例代码：

```javascript
<script setup>
import { ref, reactive, computed } from 'vue';

// 使用 ref
const count = ref(0);

// 使用 reactive
const user = reactive({
  name: 'Alice',
  age: 25
});

// 计算属性
const doubleCount = computed(() => count.value * 2);

// 方法
const increment = () => {
  count.value++;
};
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
    <p>User: {{ user.name }}, Age: {{ user.age }}</p>
  </div>
</template>
```

---

### **2. 新的内置组件**

Vue 3 提供了多种新的内置组件，进一步提升了开发体验：

- **`Fragment`**：
  - 支持无根节点的模板内容，减少不必要的 DOM 层级。
- **`Teleport`**：
  - 可以将子组件渲染到指定的 DOM 节点中，常用于模态框、弹出菜单等场景。
- **`Suspense`**：
  - 用于处理异步组件的加载状态，支持加载指示器或占位内容。

#### 示例代码：

```html
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
</template>
```

---

### **3. 其他改变**

- **新的生命周期钩子**：
  - 例如：`onMounted`、`onUpdated`、`onUnmounted` 等，更加函数化。
- **`data` 选项的声明方式**：
  - 必须始终是一个函数，避免多个实例共享数据。
- **移除 `keyCode` 支持**：
  - 鼓励使用更语义化的键值表示，例如 `@keyup.enter`。

---

## **总结**

Vue 3 是现代前端框架中的重要成员，它通过性能优化、源码升级、对 TypeScript 的全面支持以及新增的特性，为开发者提供了更高效、更灵活的开发方式。通过 `Composition API` 和其他改进，Vue 3 进一步巩固了其在前端开发中的地位，为构建复杂的现代应用提供了坚实基础。
