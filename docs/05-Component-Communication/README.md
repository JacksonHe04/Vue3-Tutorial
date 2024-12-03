# 05-Component-Communication: Vue 组件通信
**`Vue3`组件通信和`Vue2`的区别：**

* 移出事件总线，使用`mitt`代替。

- `vuex`换成了`pinia`。
- 把`.sync`优化到了`v-model`里面了。
- 把`$listeners`所有的东西，合并到`$attrs`中了。
- `$children`被砍掉了。
## 目录结构

### 1. 基础通信

介绍 Vue 组件通信的基础方法，涵盖父子组件之间的通信方式。

- [Props 传值与类型定义](01-Basic-Communication/1-Props传值与类型定义.md)  
  讲解如何通过 `props` 在父组件和子组件之间传递数据，并介绍如何为 `props` 定义类型。

- [父子组件的 Props 通信](01-Basic-Communication/2-父子组件的Props通信.md)  
  详细介绍父子组件之间的 `props` 传值方式以及如何进行父子组件的通信。

- [父子组件的 v-model 双向数据绑定](01-Basic-Communication/3-父子组件的v-model双向数据绑定.md)  
  探讨如何使用 `v-model` 实现父子组件之间的双向绑定，提升交互体验。

### 2. 高级通信

介绍 Vue 中的一些高级通信方法，适用于复杂的组件间数据传递。

- [Provide 和 Inject 实现祖孙组件通信](02-Advanced-Communication/1-Provide和Inject实现祖孙组件通信.md)  
  讲解如何使用 `provide` 和 `inject` 实现祖孙组件之间的数据共享，避免过多的层级传递。

- [自定义事件](02-Advanced-Communication/2-自定义事件.md)  
  介绍如何通过自定义事件在 Vue 中实现跨组件的通信，适用于非父子关系的组件。

- [Mitt](02-Advanced-Communication/3-Mitt.md)  
  探讨如何使用 `Mitt` 库进行全局事件处理，简化跨组件间的事件通信。

### 3. 附加功能

介绍 Vue 中一些常见的附加功能，增强组件间的交互性。

- [Slot 插槽详解](03-Additional-Features/1-Slot插槽详解.md)  
  深入讲解 Vue 中的插槽，如何通过插槽实现组件的内容分发和布局。

- [$attrs](./03-Additional-Features/2-$attrs.md)  
  介绍 `$attrs` 对象的使用，如何获取父组件传递给子组件的属性。

- [$refs 与 $parent](./03-Additional-Features/3-$refs与$parent.md)  
  探讨如何使用 `$refs` 和 `$parent` 获取子组件引用及访问父组件实例。