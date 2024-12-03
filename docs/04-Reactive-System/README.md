# 04-Reactive-System: Vue 响应式系统

## 目录结构

### 1. 响应式数据

介绍 Vue 3 中如何使用 `Proxy` 实现响应式数据。

- [由 Proxy 实现的响应式数据](1-Reactive-Data/1-由Proxy实现的响应式数据.md)  
  讲解 Vue 响应式系统的核心实现原理，如何通过 `Proxy` 使数据具备响应性。

### 2. Ref 和 Reactive

深入讲解 Vue 中 `ref` 和 `reactive` 的用法，如何在基本数据类型和对象类型中使用它们。

- [ref - 基本类型的响应式数据](2-Ref-and-Reactive/1-ref-基本类型的响应式数据.md)  
  介绍如何使用 `ref` 创建响应式的基本类型数据。

- [reactive - 对象类型的响应式数据](2-Ref-and-Reactive/2-reactive-对象类型的响应式数据.md)  
  讲解 `reactive` 用法，如何将对象转换为响应式数据。

- [ref - 对象类型的响应式数据](2-Ref-and-Reactive/3-ref-对象类型的响应式数据.md)  
  探讨 `ref` 在对象类型中的应用及其行为。

- [ref 与 reactive 的对比](2-Ref-and-Reactive/4-ref与reactive的对比.md)  
  比较 `ref` 和 `reactive` 的异同，帮助理解如何选择使用。

- [toRefs 与 toRef 的使用](2-Ref-and-Reactive/5-toRefs与toRef的使用.md)  
  讲解 `toRefs` 和 `toRef`，帮助解构响应式对象。

- [关于解构和 toRef 的意义](2-Ref-and-Reactive/6-关于解构和toRef的意义.md)  
  讨论如何正确使用解构赋值与 `toRef` 来操作响应式数据。

- [标签的 ref 属性](2-Ref-and-Reactive/7-标签的ref属性.md)  
  介绍 Vue 中标签的 `ref` 属性的使用方法。

### 3. 计算属性

介绍 Vue 中的计算属性，如何利用它们高效地处理依赖的响应式数据。

- [计算属性 Computed](3-Computed-Properties/1-计算属性Computed.md)  
  详细介绍如何使用计算属性来优化性能，并介绍计算属性的工作原理。

### 4. 观察者

学习如何使用 Vue 中的观察者来监听响应式数据的变化。

- [Watch](4-Watchers/1-Watch.md)  
  讲解 `watch` 的用法，如何在响应式数据变化时执行特定的操作。

- [watchEffect](4-Watchers/2-watchEffect.md)  
  介绍 `watchEffect`，该 API 自动追踪依赖，并在其变化时重新执行。