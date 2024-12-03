# 使用 Vue 3 中的 `provide` 和 `inject` 实现祖孙组件通信

## 概述

在 Vue 3 中，`provide` 和 `inject` 是实现祖孙组件直接通信的一种方式。通过这种方式，祖先组件可以将数据提供给后代组件，而后代组件可以通过 `inject` 获取到这些数据。这种机制可以在不通过 props 或事件的情况下，进行跨级别组件的通信。

## 具体使用

1. 在**祖先组件**中，通过 `provide` 配置向后代组件提供数据。
2. 在**后代组件**中，通过 `inject` 配置来声明接收数据。

## 具体编码

### 【第一步】在父组件中使用 `provide` 提供数据

父组件将数据提供给孙组件，使用 `provide` 让数据传递给后代组件。在父组件中，`money` 是一个响应式的 `ref`，而 `car` 是一个响应式的 `reactive` 对象。父组件还提供了一个方法 `updateMoney` 来更新 `money` 的值。

```vue
<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>资产：{{ money }}</h4>
    <h4>汽车：{{ car }}</h4>
    <button @click="money += 1">资产+1</button>
    <button @click="car.price += 1">汽车价格+1</button>
    <Child/>
  </div>
</template>

<script setup lang="ts" name="Father">
  import Child from './Child.vue'
  import { ref, reactive, provide } from "vue";
  
  // 数据
  let money = ref(100);
  let car = reactive({
    brand: '奔驰',
    price: 100
  });
  
  // 用于更新money的方法
  function updateMoney(value: number) {
    money.value += value;
  }
  
  // 提供数据
  provide('moneyContext', { money, updateMoney });
  provide('car', car);
</script>
```

> 注意：在子组件中，数据的注入和访问是透明的，子组件无需额外处理。

### 【第二步】在孙组件中使用 `inject` 接受数据

在孙组件中，我们通过 `inject` 接收祖先组件提供的数据。需要使用 `inject` 获取父组件通过 `provide` 提供的 `moneyContext` 和 `car` 对象，并能直接访问这些数据。

```vue
<template>
  <div class="grand-child">
    <h3>我是孙组件</h3>
    <h4>资产：{{ money }}</h4>
    <h4>汽车：{{ car }}</h4>
    <button @click="updateMoney(6)">点我</button>
  </div>
</template>

<script setup lang="ts" name="GrandChild">
  import { inject } from 'vue';
  
  // 注入数据
  let { money, updateMoney } = inject('moneyContext', { money: 0, updateMoney: (x: number) => {} });
  let car = inject('car');
</script>
```

### 关键点总结

- **父组件（使用 `provide`）**：通过 `provide` 提供数据，数据可以是响应式的，且方法也可以一并提供。
- **孙组件（使用 `inject`）**：通过 `inject` 接受父组件提供的数据和方法，可以直接使用这些数据进行处理。

这种方式使得跨级别组件之间的数据传递变得更加简洁，避免了过多的 `props` 和事件传递。