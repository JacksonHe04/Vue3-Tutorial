# Vue 3 中 `reactive` 创建：对象类型的响应式数据

## 作用

`reactive` 用于定义**响应式对象**。它使对象中的属性变得响应式，并且是**深层次的**响应式，这意味着嵌套的对象属性也会自动变为响应式。

**注意：**对于基本数据类型（如数字、字符串等），不应使用 `reactive`，应使用 `ref`。如果对基本类型使用 `reactive`，会导致错误。

## 语法

```js
let 响应式对象 = reactive(源对象)
```

- `源对象`：是需要变为响应式的对象，可以是一个普通对象或数组。

## 返回值

`reactive` 返回一个 `Proxy` 实例对象，通常称为**响应式对象**。通过该对象访问属性时，Vue 会自动代理该属性的访问并保持其响应式。

## 注意点

1. **适用场景：** `reactive` 用于对象类型数据，不适用于基本数据类型。对于基本类型，请使用 `ref`。

2. **深层次响应式：** `reactive` 会将对象的所有嵌套属性也变为响应式。因此，它是**深度响应式**的。

3. **模板中的简化使用：** 在模板中，我们可以直接使用 `响应式对象`，Vue 会自动处理 `.value`，无需手动加 `.value`。

## 示例代码

以下是一个示例，展示了如何使用 `reactive` 定义响应式对象数据，并进行修改。

```vue
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <h2>测试：{{ obj.a.b.c.d }}</h2>
    <button @click="changeCarPrice">修改汽车价格</button>
    <button @click="changeFirstGame">修改第一游戏</button>
    <button @click="test">测试</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { reactive } from 'vue'

  // 定义响应式对象
  let car = reactive({ brand: '奔驰', price: 100 })
  let games = reactive([
    { id: 'ahsgdyfa01', name: '英雄联盟' },
    { id: 'ahsgdyfa02', name: '王者荣耀' },
    { id: 'ahsgdyfa03', name: '原神' }
  ])
  let obj = reactive({
    a: {
      b: {
        c: {
          d: 666
        }
      }
    }
  })

  // 修改汽车价格的方法
  function changeCarPrice() {
    car.price += 10
  }

  // 修改第一款游戏名称的方法
  function changeFirstGame() {
    games[0].name = '流星蝴蝶剑'
  }

  // 修改嵌套对象属性的方法
  function test() {
    obj.a.b.c.d = 999
  }
</script>
```

## 代码解析

1. **定义响应式对象：**
    - `car` 是一个包含品牌和价格的对象，使用 `reactive` 定义为响应式对象。
    - `games` 是一个数组，包含多个游戏对象，同样使用 `reactive` 定义。
    - `obj` 是一个多层嵌套的对象，包含属性 `a.b.c.d`，并通过 `reactive` 将其变为响应式。

2. **通过直接修改属性触发视图更新：**
   在 `changeCarPrice` 和 `changeFirstGame` 方法中，直接修改响应式对象的属性（如 `car.price` 和 `games[0].name`），这些操作会自动触发视图更新。

3. **深层次响应式：**
   `obj` 是一个深层次的嵌套对象，使用 `reactive` 包裹后，`obj.a.b.c.d` 也会变为响应式属性。当我们在 `test` 方法中修改 `obj.a.b.c.d` 的值时，Vue 会自动更新视图。

4. **模板中的数据绑定：**
   在模板中，直接使用 `car.brand`、`games` 和 `obj.a.b.c.d`，Vue 会自动处理响应式数据的绑定，无需手动加 `.value`。

## 总结

- `reactive` 用于创建对象类型的响应式数据，并且它支持深层次的响应式更新。
- 它是通过 `Proxy` 实现的，可以方便地自动跟踪对象及其嵌套属性的变化。
- 适用于对象类型数据，基本类型数据则应使用 `ref`。
- 在 Vue 模板中，直接使用响应式对象的属性，Vue 会自动处理 `.value`，简化了开发工作。