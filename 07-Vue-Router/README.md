# 05-Vue-Router

## 目录结构

### 1. [路由配置](./1-Router-Configuration)

包含 Vue Router 的基础配置与路由模式的设置。

- [路由组件与一般组件](./1-Router-Configuration/1-路由组件与一般组件.md)  
  介绍如何区分路由组件与普通组件，以及如何在路由中使用组件。

- [History模式和Hash模式](./1-Router-Configuration/2-HIstory模式和Hash模式.md)  
  讲解 Vue Router 中两种常用的路由模式，`History` 和 `Hash` 模式的区别与使用场景。

### 2. [路由链接与守卫](./2-Route-Links-and-Guards)

介绍 Vue Router 中的路由链接及其守卫机制。

- [三种路由链接形式](./2-Route-Links-and-Guards/1-三种路由链接形式.md)  
  介绍 Vue Router 中常见的三种路由链接形式：`<router-link>`、`router.push` 和 `router.replace`。

- [Push和Replace](./2-Route-Links-and-Guards/2-Push和Replace.md)  
  讲解 `push` 和 `replace` 方法的使用区别与适用场景。

### 3. [路由参数与嵌套路由](./3-Route-Params-and-Nested-Routes)

讲解如何在 Vue Router 中处理路由参数和嵌套路由。

- [Query传参](./3-Route-Params-and-Nested-Routes/1-Query传参.md)  
  介绍如何使用 URL 查询参数 (`query`) 传递信息。

- [Params传参](./3-Route-Params-and-Nested-Routes/2-Params传参.md)  
  讲解通过 URL 路径中的动态参数传递数据的方法。

- [Props配置对于路由传参的作用](./3-Route-Params-and-Nested-Routes/3-Props配置对于路由传参的作用.md)  
  说明如何通过配置 `props` 来将路由参数直接传递给组件。

- [编程式路由导航](./3-Route-Params-and-Nested-Routes/4-编程式路由导航.md)  
  介绍如何通过编程方式进行路由跳转，以及如何处理路由的导航。