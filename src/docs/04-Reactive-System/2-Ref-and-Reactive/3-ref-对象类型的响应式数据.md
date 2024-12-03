# Vue 3 中 `ref` 创建：对象类型的响应式数据

## 作用

`ref` 除了可以用来创建基本类型的响应式数据外，还可以接收对象类型的数据。使用 `ref` 包裹对象时，Vue 会自动将该对象内部的属性转化为响应式的。实际上，这个过程内部是调用了 `reactive` 函数来实现的。

## 语法

```js
let xxx = ref(对象)
```

- `xxx`：是一个响应式对象变量。
- `对象`：可以是任何 JavaScript 对象，例如普通对象、数组等。

## 返回值

`ref` 会返回一个 `RefImpl` 实例对象，类似于创建基本类型时的 `ref`，但这次它包裹的是对象类型。你可以通过 `.value` 来访问或修改该对象的属性。

## 注意点

1. **`ref` 包裹对象：** 即便是对象类型的数据，依然需要通过 `.value` 来访问或修改其属性。例如，`car.value.price`。

2. **对象内部的属性响应式：** 如果对象中的属性本身是对象或数组，Vue 会自动递归地将这些属性也变为响应式。也就是说，`ref` 中的对象是深度响应式的。

3. **模板中的简化：** 在 Vue 的模板中，同样不需要显式加 `.value`，只需直接使用对象属性。例如：`{{ car.brand }}` 会自动访问 `car.value.brand`。

## 示例代码

以下是一个示例，展示了如何使用 `ref` 创建响应式对象数据，并对其进行修改。

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
   import {ref} from 'vue'

   // 定义响应式对象
   let car = ref({brand: '奔驰', price: 100})
   let games = ref([
      {id: 'ahsgdyfa01', name: '英雄联盟'},
      {id: 'ahsgdyfa02', name: '王者荣耀'},
      {id: 'ahsgdyfa03', name: '原神'}
   ])
   let obj = ref({
      room: {
         floor: {
            dust: {
               d: 666
            }
         }
      }
   })

   // 修改汽车价格的方法
   function changeCarPrice() {
      car.value.price += 10
   }

   // 修改第一款游戏名称的方法
   function changeFirstGame() {
      games.value[0].name = '流星蝴蝶剑'
   }

   // 修改嵌套对象属性的方法
   function test() {
      obj.value.room.floor.dust.d = 999
   }
</script>
```

## 代码解析

1. **定义响应式对象：**
    - `car` 是一个包含品牌和价格的对象，通过 `ref` 创建了响应式对象。
    - `games` 是一个数组，包含多个游戏对象，同样通过 `ref` 创建响应式数组。
    - `obj` 是一个多层嵌套的对象，包含深层次的属性（如 `a.b.c.d`）。

2. **通过 `.value` 访问和修改：**  
   在 `changeCarPrice` 和 `changeFirstGame` 方法中，我们通过 `.value` 来访问和修改响应式对象的属性，这些操作会触发 Vue 的响应式更新。

3. **深度响应式：**  
   即使是多层嵌套的对象，如 `obj`，其所有嵌套的属性也会变为响应式。在 `test` 方法中，我们直接修改 `obj.value.a.b.c.d`，Vue 会自动处理并更新视图。

4. **模板中的数据绑定：**  
   在模板中，我们直接使用 `car.brand`、`games` 和 `obj.a.b.c.d`，Vue 会自动读取对应的 `ref.value`，无需手动加 `.value`。

## 总结

- `ref` 不仅可以用于基本数据类型，也可以用于对象类型。它会将对象中的属性变为响应式，确保视图在数据变化时能自动更新。
- 对于对象类型，Vue 内部会使用 `reactive` 来处理对象的响应式，保持其深度响应式特性。
- 在模板中，我们可以像普通数据一样访问对象属性，Vue 会自动处理 `.value`。