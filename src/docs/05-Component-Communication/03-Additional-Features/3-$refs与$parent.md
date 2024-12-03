# `$refs` 和 `$parent` 详解

## 1. 概述

- **`$refs`**：用于父组件通过 `ref` 绑定标识访问子组件或 DOM 元素，支持从父组件直接访问子组件的实例或 DOM 节点。
- **`$parent`**：用于子组件访问其父组件的实例，从而可以获取父组件的数据或方法。

### 使用场景

- **`$refs`**：通常用于父组件向子组件或 DOM 元素传递引用，使得父组件能够直接操作子组件的实例或 DOM。
- **`$parent`**：子组件通过 `$parent` 获取父组件实例，从而可以调用父组件的函数、获取父组件的数据等。

## 2. 原理

| 属性      | 说明                                                     |
| --------- | -------------------------------------------------------- |
| `$refs`   | 一个对象，包含所有通过 `ref` 属性标识的 DOM 元素或子组件实例。|
| `$parent` | 当前组件的父组件实例对象，可以通过它访问父组件的方法、数据等。|

## 示例

### 使用 `$refs`（父 → 子）

通过 `$refs`，父组件可以直接访问子组件的实例或 DOM 元素。使用 `ref` 标识后，可以在父组件中访问这些实例。

#### 父组件

```vue
<template>
  <div>
    <h3>父组件</h3>
    <!-- 使用 ref 绑定子组件实例 -->
    <Child ref="childComponent" />
    <button @click="accessChild">访问子组件方法</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import Child from './Child.vue';
  
  // 获取子组件实例
  const childComponent = ref(null);

  // 访问子组件中的方法
  const accessChild = () => {
    if (childComponent.value) {
      childComponent.value.sayHello();  // 调用子组件的方法
    }
  };
</script>
```

#### 子组件

```vue
<template>
  <div>
    <h4>子组件</h4>
  </div>
</template>

<script setup lang="ts">
  // 定义子组件方法
  const sayHello = () => {
    console.log('Hello from Child Component!');
  };

  defineExpose({
    sayHello
  });
</script>
```

在上面的例子中，父组件通过 `ref` 引用子组件，并在点击按钮时通过 `$refs` 访问子组件的 `sayHello` 方法。

### 使用 `$parent`（子 → 父）

通过 `$parent`，子组件可以访问父组件的实例，从而调用父组件的方法或访问父组件的数据。

#### 父组件

```vue
<template>
  <div>
    <h3>父组件</h3>
    <Child />
  </div>
</template>

<script setup lang="ts">
  import Child from './Child.vue';
  
  // 父组件中的数据或方法
  const parentData = 'Hello from Parent';

  const parentMethod = () => {
    console.log('Method in Parent called from Child');
  };
</script>
```

#### 子组件

```vue
<template>
  <div>
    <h4>子组件</h4>
    <button @click="callParentMethod">调用父组件方法</button>
    <p>{{ parentData }}</p>
  </div>
</template>

<script setup lang="ts">
  // 通过 $parent 访问父组件的方法和数据
  const callParentMethod = () => {
    console.log('Calling parent method...');
    // 调用父组件的方法
    if ($parent) {
      $parent.parentMethod();
    }
  };

  const parentData = $parent ? $parent.parentData : '';
</script>
```

在这个示例中，子组件通过 `$parent` 访问父组件的 `parentMethod` 和 `parentData`，并在点击按钮时调用父组件的方法。

## 总结

- **`$refs`**：用于父组件访问子组件实例或 DOM 元素，可以直接操作子组件的方法或属性。
- **`$parent`**：用于子组件访问父组件实例，允许子组件调用父组件的方法或获取父组件的数据。