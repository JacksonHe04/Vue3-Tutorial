# 【mitt】

## 1. 概述

`mitt` 是一个轻量级的事件总线库，通常用于实现组件之间的消息订阅与发布（`pubsub`）功能。它能够帮助我们在任意组件之间传递数据，而无需通过父子组件的方式进行传递。

这种方式常用于跨组件的通信场景，尤其是当组件之间没有直接关系时。通过事件总线，任意组件可以通过订阅和发布事件来实现通信。

## 2. 安装 `mitt`

在项目中使用 `mitt` 之前，需要先安装它：

```shell
npm i mitt
```

## 3. 配置事件总线

### 创建事件总线

在 `src/utils/emitter.ts` 文件中创建事件总线 `emitter`，并对外暴露：

```javascript
// 引入mitt
import mitt from "mitt";

// 创建emitter
const emitter = mitt()

/*
  // 绑定事件
  emitter.on('abc', (value) => {
    console.log('abc事件被触发', value)
  })
  
  emitter.on('xyz', (value) => {
    console.log('xyz事件被触发', value)
  })

  setInterval(() => {
    // 触发事件
    emitter.emit('abc', 666)
    emitter.emit('xyz', 777)
  }, 1000);

  setTimeout(() => {
    // 清理事件
    emitter.all.clear()
  }, 3000);
*/

// 创建并暴露mitt
export default emitter
```

在上面的代码中，我们创建了 `emitter` 实例，并绑定了两个事件 `abc` 和 `xyz`。通过 `setInterval` 来周期性地触发这些事件。同时，我们还通过 `setTimeout` 来清理所有的事件。

## 4. 组件中使用事件总线

### 4.1. 接收数据的组件

在接收数据的组件中，我们需要绑定事件并在组件销毁前解绑事件：

```typescript
import emitter from "@/utils/emitter";
import { onUnmounted } from "vue";

// 绑定事件
emitter.on('send-toy', (value) => {
  console.log('send-toy事件被触发', value)
})

onUnmounted(() => {
  // 解绑事件
  emitter.off('send-toy')
})
```

在这个例子中，当 `send-toy` 事件被触发时，组件会打印出相关数据。当组件卸载时，通过 `onUnmounted` 钩子来解绑事件，避免内存泄漏。

### 4.2. 触发事件的组件

在提供数据的组件中，我们可以在合适的时机触发事件：

```javascript
import emitter from "@/utils/emitter";

function sendToy() {
  // 触发事件
  emitter.emit('send-toy', toy.value)
}
```

在这个例子中，`sendToy` 函数通过 `emitter.emit` 触发了 `send-toy` 事件，并将 `toy.value` 作为事件数据传递出去。

## 5. 注意事项

- **事件总线依赖关系**：`mitt` 的事件总线依赖于组件之间的事件绑定和解绑。在适当的生命周期钩子中进行解绑（如 `onUnmounted`）非常重要，以避免潜在的内存泄漏问题。
- **事件命名**：事件名是任意的，但应遵循一定的命名规范，以避免命名冲突。

`mitt` 提供了一个简洁的方式来进行跨组件的通信，特别适用于非父子关系的组件间数据传递。