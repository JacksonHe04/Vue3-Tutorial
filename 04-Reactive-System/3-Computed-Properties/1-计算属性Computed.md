# Vue 3中的计算属性（`computed`）

## 作用

`computed` 是 Vue 3 中的一个特性，用来根据已有的数据动态计算出新的数据，类似于 Vue 2 中的计算属性。它允许你在模板中像访问普通属性一样，访问由多个数据源计算得出的值。与 `data` 中的数据不同，计算属性的值是根据相关数据的变化而自动更新的。

## 基本用法

计算属性是一个只读属性，意味着它的值是自动计算并且只会在其依赖的响应式数据变化时更新。

### 示例代码

```vue
<template>
  <div class="person">
    姓：<input type="text" v-model="firstName"> <br>
    名：<input type="text" v-model="lastName"> <br>
    全名：<span>{{fullName}}</span> <br>
    <button @click="changeFullName">全名改为：li-si</button>
  </div>
</template>

<script setup lang="ts" name="App">
  import {ref,computed} from 'vue'

  let firstName = ref('zhang')
  let lastName = ref('san')

  // 计算属性——既读取又修改
  let fullName = computed({
    // 读取
    get(){
      return firstName.value + '-' + lastName.value
    },
    // 修改
    set(val){
      console.log('有人修改了fullName',val)
      firstName.value = val.split('-')[0]
      lastName.value = val.split('-')[1]
    }
  })

  function changeFullName(){
    fullName.value = 'li-si'
  } 
</script>
```

## 代码解析

1. **定义响应式数据：**

   ```javascript
   let firstName = ref('zhang')
   let lastName = ref('san')
   ```

   `ref` 用于定义响应式变量 `firstName` 和 `lastName`，它们的初始值分别为 "zhang" 和 "san"。

2. **计算属性 `fullName`：**

   ```javascript
   let fullName = computed({
     // 读取
     get() {
       return firstName.value + '-' + lastName.value
     },
     // 修改
     set(val) {
       console.log('有人修改了fullName', val)
       firstName.value = val.split('-')[0]
       lastName.value = val.split('-')[1]
     }
   })
   ```

    - `get` 方法用于读取 `fullName` 的值。它将 `firstName` 和 `lastName` 连接成一个字符串，并返回结果。
    - `set` 方法用于修改 `fullName` 的值。当用户修改 `fullName` 时（通过 `fullName = 'li-si'`），`set` 方法会被触发，将新的值拆分并更新 `firstName` 和 `lastName`。

3. **修改 `fullName` 的值：**

   ```javascript
   function changeFullName() {
     fullName.value = 'li-si'
   }
   ```

   `changeFullName` 函数用于修改 `fullName` 的值。当点击按钮时，`fullName` 被设为 "li-si"，此时 `set` 方法会被调用，修改 `firstName` 和 `lastName`。

## 计算属性与普通方法的区别

- 计算属性是基于其依赖的数据进行缓存的，只有在依赖的数据发生变化时，计算属性才会重新计算。如果依赖的数据没有变化，计算属性会直接返回之前计算的值。
- 普通方法每次调用都会重新计算，而计算属性只有在相关数据变化时才会更新，提高性能。

### 示例：计算属性与方法的对比

```vue
<template>
  <div>
    <p>计算属性：{{ fullName }}</p>
    <p>方法：{{ getFullName() }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let firstName = ref('zhang')
let lastName = ref('san')

// 计算属性
let fullName = computed(() => {
  return firstName.value + '-' + lastName.value
})

// 方法
function getFullName() {
  return firstName.value + '-' + lastName.value
}
</script>
```

在上面的代码中，`fullName` 是一个计算属性，而 `getFullName` 是一个普通方法。每次访问 `getFullName` 时，它都会重新计算返回值，而 `fullName` 会在 `firstName` 或 `lastName` 变化时更新，性能更加高效。

## 总结

- `computed` 用于定义基于已有数据计算出的值，它的值会根据相关数据的变化自动更新。
- 计算属性支持 `get` 和 `set` 方法，允许既能读取也能修改计算属性的值。
- 计算属性具有缓存机制，只有依赖的数据发生变化时才会重新计算，性能优于普通方法。

计算属性是 Vue 中非常强大的特性，在复杂的应用中，能够极大地减少冗余计算，提高性能。