# 06-Pinia: Pinia 状态管理

## 目录结构

### 1. Pinia 基础

介绍如何使用 Pinia 进行状态管理，并设置 Pinia 环境。

- [搭建 Pinia 环境](1-Pinia-Basics/1-搭建Pinia环境.md)  
  讲解如何在 Vue 3 项目中安装和配置 Pinia，快速开始使用 Pinia 进行状态管理。

### 2. 状态管理

深入 Pinia 的状态管理方法，学习如何存储、读取和修改数据。

- [存储与读取数据](2-State-Manage/1-存储与读取数据.md)  
  介绍如何在 Pinia 中创建 store 并存储数据，同时学习如何读取 store 中的数据。

- [修改数据](2-State-Manage/2-修改数据.md)  
  探讨如何修改 store 中的数据，介绍 Pinia 提供的相关 API。

- [StoreToRefs](2-State-Manage/3-StoreToRefs.md)  
  讲解如何使用 `storeToRefs` 将 store 中的状态解构为响应式引用，提升代码的可维护性。

- [数据共享与响应式更新](2-State-Manage/4-数据共享与响应式更新.md)  
  介绍如何在多个组件间共享 Pinia store，并确保数据变化时的响应式更新。

### 3. 高级 Pinia 使用

学习 Pinia 中的一些高级功能，进一步提升状态管理的能力和灵活性。

- [getters](3-Advanced-Pinia/1-getters.md)  
  讲解如何使用 Pinia 的 `getters` 进行计算属性的创建和管理，提高 store 数据的查询效率。

- [使用 $subscribe 方法侦听 state 变化](./3-Advanced-Pinia/2-使用$subscribe方法侦听state变化.md)  
  探讨如何通过 `$subscribe` 方法侦听 Pinia store 中的 state 变化，并执行相应的回调函数。

- [使用组合式 API 编写 store](3-Advanced-Pinia/3-使用组合式API编写store.md)  
  介绍如何结合 Vue 3 的组合式 API 编写 Pinia store，提高代码的模块化和可重用性。