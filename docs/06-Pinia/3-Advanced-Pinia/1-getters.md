# Vue 3 中的 Pinia 状态管理：使用 `getters`

## 1. 概念
在使用 Pinia 进行状态管理时，有时我们需要从 `state` 中的原始数据中计算出新的值或处理后的数据，这时可以通过 `getters` 来进行配置。`getters` 类似于 Vuex 中的计算属性，它能够动态计算数据并返回结果，而不直接修改 `state`。

## 2. 追加 `getters` 配置

在 Pinia 中，`getters` 是存放计算状态的地方。通过 `getters`，你可以在 `state` 上进行运算或对数据进行格式化等操作，进而返回计算后的数据。

### 示例代码

```js
// 引入defineStore用于创建store
import { defineStore } from 'pinia'

// 定义并暴露一个store
export const useCountStore = defineStore('count', {
  // 动作
  actions: {
    // 这里可以定义修改state的操作
  },
  
  // 状态
  state() {
    return {
      sum: 1,
      school: 'atguigu'
    }
  },
  
  // 计算
  getters: {
    // bigSum getter：通过state中的sum计算出bigSum，返回sum乘以10
    bigSum: (state): number => state.sum * 10,

    // upperSchool getter：将state中的school字符串转换为大写
    upperSchool(): string {
      return this.school.toUpperCase()
    }
  }
})
```

### 代码解释

- `state`：用于定义应用的状态数据，如 `sum` 和 `school`。
- `getters`：
    - `bigSum`：通过 `state.sum` 计算出 `bigSum`，它返回 `sum * 10` 的结果。
    - `upperSchool`：将 `state.school` 的值转换成大写并返回。

## 3. 组件中读取数据

在 Vue 组件中，我们可以通过 Pinia 提供的 `storeToRefs` 将 store 中的数据转换为响应式引用，方便我们在模板中使用。

### 示例代码

```js
// 引入pinia store
import { useCountStore } from './stores/countStore'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    // 使用 Pinia store
    const countStore = useCountStore()

    // 获取 store 中的数据
    const { increment, decrement } = countStore
    let { sum, school, bigSum, upperSchool } = storeToRefs(countStore)

    // 返回数据和方法以便在模板中使用
    return {
      sum,
      school,
      bigSum,
      upperSchool,
      increment,
      decrement
    }
  }
}
```

### 代码解释

- 通过 `storeToRefs(countStore)` 获取 store 中的所有状态和计算属性，并将它们解构出来作为响应式数据。
- `bigSum` 和 `upperSchool` 就是我们通过 `getters` 配置的计算属性，它们会根据 `state` 的变化动态更新。

## 总结

`getters` 是用于计算 `state` 中数据的一个非常有用的特性，它能够帮助我们在不直接修改 `state` 的情况下，对数据进行加工处理。在 Pinia 中配置 `getters` 的方式非常简洁，且可以在组件中像普通属性一样方便地访问。