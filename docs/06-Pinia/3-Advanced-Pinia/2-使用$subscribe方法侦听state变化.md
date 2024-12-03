# Vue 3 中的 Pinia 状态管理：使用 `$subscribe` 方法侦听 `state` 变化

## 1. 概念
在 Pinia 中，`$subscribe()` 方法允许我们侦听 `store` 的状态 (`state`) 以及它的变化。这个方法可以帮助我们在状态改变时执行某些副作用操作，比如更新本地存储、发送日志等。通过这种方式，我们能够跟踪 `store` 中数据的变化。

## 2. 使用 `$subscribe` 侦听 `state` 变化

`$subscribe` 方法接收一个回调函数，这个函数会在 `store` 的状态发生变化时被调用。回调函数会接收到两个参数：
- `mutate`：表示当前的变更对象，包含了具体的变动信息。
- `state`：表示变更后的整个 `store` 的最新状态。

### 示例代码

```ts
// 假设talkStore是一个Pinia store
talkStore.$subscribe((mutate, state) => {
  console.log('LoveTalk', mutate, state)

  // 将更新后的 talkList 保存到localStorage中
  localStorage.setItem('talk', JSON.stringify(talkList.value))
})
```

### 代码解释

- `talkStore.$subscribe()`：用于侦听 `talkStore` 的状态变化。
- 回调函数 `(mutate, state)`：
    - `mutate`：包含了此次状态变更的详细信息，通常包括 `type`（操作类型，如添加或删除）和 `payload`（操作的具体数据）。
    - `state`：变更后的完整状态对象，表示 `store` 中所有的数据。
- `localStorage.setItem()`：在每次状态变化时，将更新后的 `talkList` 保存到本地存储中。

## 3. 订阅 `state` 的变化

通过 `$subscribe` 方法，您可以监控 `store` 中所有状态的变化。这样可以确保在任何状态变化后执行必要的操作，比如数据持久化、同步等。

### 示例：持久化数据

```ts
// 假设我们有一个 store 管理用户的登录信息
const userStore = defineStore('user', {
  state: () => ({
    loggedIn: false,
    userData: {}
  }),
  actions: {
    login(data) {
      this.loggedIn = true
      this.userData = data
    },
    logout() {
      this.loggedIn = false
      this.userData = {}
    }
  }
})

// 订阅 store 变化，将状态存入 localStorage
userStore.$subscribe((mutate, state) => {
  console.log('User Store Change:', mutate, state)
  localStorage.setItem('user', JSON.stringify(state))
})
```

在这个例子中，`userStore` 会被侦听，每次状态发生变化时，都会更新 `localStorage` 中的用户数据。

## 4. 总结

通过 Pinia 的 `$subscribe()` 方法，您可以轻松地监听 `store` 中 `state` 的变化，并对这些变化做出响应。常见的应用场景包括将状态持久化到 `localStorage` 或 `sessionStorage`，或者在状态变化时执行一些副作用操作。