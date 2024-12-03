# Vue 3 中的 Pinia 状态管理：使用组合式 API 编写 `store`

## 1. 概念
在 Pinia 中，除了传统的选项式写法（通过对象配置 `state`、`getters` 和 `actions`），我们还可以使用组合式 API 来定义 `store`，这种方式更符合 Vue 3 的响应式设计理念。组合式写法通过 `defineStore` 函数并传入一个工厂函数来创建 `store`，使得代码更加灵活和模块化。

## 2. 使用组合式 API 定义 `store`

在组合式写法中，我们可以像在组件的 `setup` 函数中那样，使用 `reactive`、`ref` 等响应式 API 来定义状态，并使用普通函数来处理业务逻辑。这样可以实现更加灵活的 `store` 结构，并让状态管理与组件逻辑更加贴合。

### 示例代码

```ts
import { defineStore } from 'pinia'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { reactive } from 'vue'

export const useTalkStore = defineStore('talk', () => {
  // talkList 就是 state
  const talkList = reactive(
    JSON.parse(localStorage.getItem('talkList') as string) || []
  )

  // getATalk 函数相当于 action
  async function getATalk() {
    // 发请求，下面这行的写法是：连续解构赋值 + 重命名
    let { data: { content: title } } = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')

    // 把请求回来的字符串，包装成一个对象
    let obj = { id: nanoid(), title }

    // 放到数组中
    talkList.unshift(obj)

    // 更新到 localStorage 中
    localStorage.setItem('talkList', JSON.stringify(talkList))
  }

  // 返回 state 和 action
  return { talkList, getATalk }
})
```

### 代码解释

- **`state`（`talkList`）**：使用 Vue 3 的 `reactive` API 来定义 `talkList`，它会根据 `localStorage` 中的存储值初始化，如果没有存储值则默认是一个空数组。

- **`action`（`getATalk`）**：这是一个异步函数，使用 `axios` 请求数据并将获取到的数据（如 `title`）包装成一个对象，生成一个唯一的 `id`，然后将这个对象插入到 `talkList` 数组的前面。

- **`localStorage` 持久化**：每次更新 `talkList` 后，都把最新的状态存储到 `localStorage` 中，以便页面刷新后依然可以保持数据。

### 使用组合式 API 的优势

- **灵活性**：组合式 API 让你可以像在 Vue 组件中一样使用响应式数据和函数，这样的结构更符合 Vue 3 的设计哲学，代码更加简洁易懂。
- **模块化**：每个 `store` 都是一个独立的功能单元，可以通过工厂函数来定义和组合，便于拆分和维护。
- **方便管理副作用**：通过 `setup` 中定义的函数（如 `getATalk`），可以轻松管理异步操作或其他副作用，逻辑更加清晰。

## 3. 组件中使用组合式 `store`

在组件中，我们可以通过调用 `useTalkStore` 获取到 `store`，然后直接访问 `state` 和 `action`，以进行数据操作或显示。

### 示例代码

```ts
import { useTalkStore } from './stores/talkStore'

export default {
  setup() {
    const { talkList, getATalk } = useTalkStore()

    // 调用 getATalk 获取新的数据
    const fetchTalk = async () => {
      await getATalk()
    }

    return {
      talkList,
      fetchTalk
    }
  }
}
```

在这个例子中，我们在组件中使用 `useTalkStore` 获取 `store`，并通过 `talkList` 获取状态数据，调用 `fetchTalk` 函数来触发异步获取数据的操作。

## 4. 总结

使用 Pinia 的组合式 API 来定义 `store` 是一种灵活、简洁的写法，它让我们能够充分利用 Vue 3 的响应式系统，并且使得 `state`、`action` 和副作用处理更加模块化。在大型应用中，这种写法可以帮助我们将每个功能单元进行清晰地分离和管理。