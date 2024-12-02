# Vue 3 的模板语法

Vue 3 的模板语法用于将数据绑定到 HTML 结构上，通过指令动态更新 DOM 的显示和行为。以下是对常见指令和模板语法的详细说明。

---

## 基础语法概览

Vue 的模板语法允许使用 HTML 加入动态数据绑定和条件、循环等逻辑操作。核心是通过 **双大括号插值语法** 和 **指令** 来实现。

### 插值语法

#### 文本插值
使用 `{{}}` 插值来动态显示数据：
```html
<p>{{ message }}</p>
```
若 `message` 的值为 `Hello Vue!`，渲染结果为：
```html
<p>Hello Vue!</p>
```

#### 属性插值
通过 `v-bind` 或简写 `:` 绑定 HTML 属性：
```html
<img v-bind:src="imageSrc" alt="Image">
<!-- 简写 -->
<img :src="imageSrc" alt="Image">
```

---

## 常见指令

### 条件渲染：`v-if`、`v-else-if` 和 `v-else`

用于根据条件动态显示或隐藏元素：
```html
<p v-if="show">显示内容</p>
<p v-else>隐藏内容</p>
```

多个条件：
```html
<div v-if="type === 'A'">A 类型</div>
<div v-else-if="type === 'B'">B 类型</div>
<div v-else>其他类型</div>
```

#### `v-show`
与 `v-if` 类似，但使用 `CSS` 的 `display` 来切换显示状态：
```html
<p v-show="isVisible">显示或隐藏</p>
```

**区别**：
- `v-if` 彻底移除元素（性能较低，适合动态渲染）。
- `v-show` 元素始终存在，只是控制可见性（性能较高，适合频繁切换）。

---

### 列表渲染：`v-for`

循环渲染列表项：
```html
<ul>
  <li v-for="item in items" :key="item.id">{{ item.name }}</li>
</ul>
```

#### `v-for` 的语法
- **数组**：
  ```html
  <div v-for="(item, index) in items" :key="index">{{ index }} - {{ item }}</div>
  ```

- **对象**：
  ```html
  <div v-for="(value, key, index) in obj" :key="key">
    {{ index }}: {{ key }} = {{ value }}
  </div>
  ```

---

### 属性绑定：`v-bind`

动态绑定 HTML 属性：
```html
<a v-bind:href="url">点击跳转</a>
<!-- 简写 -->
<a :href="url">点击跳转</a>
```

绑定多个属性：
```html
<div v-bind="{ id: dynamicId, class: dynamicClass }"></div>
```

---

### 事件绑定：`v-on`

绑定事件处理器：
```html
<button v-on:click="handleClick">点击</button>
<!-- 简写 -->
<button @click="handleClick">点击</button>
```

传递参数：
```html
<button @click="handleClick($event, 'Hello')">点击</button>
```

---

### 双向绑定：`v-model`

实现表单元素和数据的双向绑定：
```html
<input v-model="inputValue">
<p>输入值：{{ inputValue }}</p>
```

#### 修饰符
- `.lazy`：仅在 `change` 事件时同步：
  ```html
  <input v-model.lazy="inputValue">
  ```
- `.number`：自动将用户输入转换为数字：
  ```html
  <input v-model.number="inputValue">
  ```
- `.trim`：自动去除输入的空格：
  ```html
  <input v-model.trim="inputValue">
  ```

---

## 条件与列表的结合

可以同时使用 `v-if` 和 `v-for`，但建议避免混用，提升可读性和性能。
```html
<li v-for="item in items" :key="item.id" v-if="item.isVisible">
  {{ item.name }}
</li>
```

---

## 常用指令扩展

### `v-slot`

用于插槽内容的分发：
```html
<template v-slot:default>
  <p>插槽内容</p>
</template>
```

---

## 模板语法进阶

### 指令中的表达式

指令内部支持简单的 JavaScript 表达式：
```html
<p :class="isActive ? 'active' : ''">{{ isActive ? '激活' : '未激活' }}</p>
```

**注意**：不能使用复杂的语句如 `if` 或 `for`。

---

## 总结

掌握 Vue 的模板语法可以让我们更加高效地开发动态的、响应式的网页。通过对指令（如 `v-if`、`v-for`、`v-bind` 等）的灵活运用，可以方便地实现各种动态效果。结合 Vue 的组件系统，可以进一步提升代码的复用性和可维护性。