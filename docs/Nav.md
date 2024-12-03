## Vue 3 学习导航文档

本目录包含了Vue 3的文档资料，分为不同的主题模块，每个模块下包含相关的文件和介绍。通过这个文档，你可以快速找到所需的学习内容。

---

### [01-Overview (概览)](./01-Overview/README.md)
该模块提供Vue 3概览及基本介绍。

---

### [02-Vue-Basics (Vue基础)](02-Vue-Basics/README.md)
本模块包含了Vue 3的基础知识，包括安装、项目创建以及模板语法的使用。

#### 1-Installation-and-Project-Creation (安装与项目创建)
- **[1-基于VueCli或Vite安装和创建Vue3项目](02-Vue-Basics/1-Installation-and-Project-Creation/1-基于VueCli或Vite安装和创建Vue3项目.md)**：介绍如何使用Vue CLI或Vite创建Vue 3项目。
- **[2-组件实例的创建](02-Vue-Basics/1-Installation-and-Project-Creation/2-create.md)**：讲解如何创建Vue组件实例。

#### 2-Template-Syntax（模板语法）
- **[1-Overview](02-Vue-Basics/2-Template-Syntax（模板语法）/1-Overview.md)**：Vue 3模板语法概述。
- **[2-v-model](02-Vue-Basics/2-Template-Syntax（模板语法）/2-v-model.md)**：讲解`v-model`的使用方法。

#### 3-Event-Handling (事件处理)
- **[1-在模板中绑定事件和处理用户输入](02-Vue-Basics/3-Event-Handling/1-在模板中绑定事件和处理用户输入.md)**：介绍如何在Vue模板中绑定事件并处理用户输入。

---

### [03-Composition-API (组合式API)](03-Composition-API/README.md)
本模块介绍Vue 3中的组合式API，包括基础语法和常用的Hooks。

#### 1-Basic-Gramma (基础语法)
- **[1-Setup概述](03-Composition-API/1-Basic-Gramma/1-Setup概述.md)**：讲解组合式API中的`setup`函数。
- **[2-选项式API与组合式API的区别](03-Composition-API/1-Basic-Gramma/2-选项式API与组合式API的区别.md)**：对比选项式API和组合式API的区别。

#### 2-Hooks (钩子函数)
- **[1-生命周期钩子](03-Composition-API/2-Hooks/1-生命周期钩子.md)**：Vue 3中的生命周期钩子函数介绍。
- **[2-自定义Hooks](03-Composition-API/2-Hooks/2-自定义Hooks.md)**：如何自定义组合式API中的Hooks。

---

### [04-Reactive-System (响应式系统)](04-Reactive-System/README.md)
本模块介绍Vue 3的响应式系统，如何使用`reactive`和`ref`来管理数据。

#### 1-Reactive-Data (响应式数据)
- **[1-由Proxy实现的响应式数据](04-Reactive-System/1-Reactive-Data/1-由Proxy实现的响应式数据.md)**：介绍如何通过`Proxy`实现响应式数据。

#### 2-Ref-and-Reactive (Ref与Reactive)
- **[1-ref-基本类型的响应式数据](04-Reactive-System/2-Ref-and-Reactive/1-ref-基本类型的响应式数据.md)**：讲解`ref`的基本使用，如何处理基本数据类型的响应式。
- **[2-reactive-对象类型的响应式数据](04-Reactive-System/2-Ref-and-Reactive/2-reactive-对象类型的响应式数据.md)**：介绍如何使用`reactive`处理对象类型的响应式数据。
- **[3-ref-对象类型的响应式数据](04-Reactive-System/2-Ref-and-Reactive/3-ref-对象类型的响应式数据.md)**：介绍如何使用`ref`处理对象类型的响应式数据。
- **[4-ref与reactive的对比](04-Reactive-System/2-Ref-and-Reactive/4-ref与reactive的对比.md)**：对比`ref`与`reactive`的使用场景。
- **[5-toRefs与toRef 的使用](docs/04-Reactive-System/2-Ref-and-Reactive/5-toRefs与toRef的使用)**：讲解`toRefs`与`toRef`的使用方法。
- **[6-关于解构和toRef的意义](04-Reactive-System/2-Ref-and-Reactive/6-关于解构和toRef的意义.md)**：分析`toRef`在解构中的应用。
- **[7-标签的ref属性](04-Reactive-System/2-Ref-and-Reactive/7-标签的ref属性.md)**：介绍标签的`ref`属性使用。

#### 3-Computed-Properties (计算属性)
- **[1-计算属性Computed](04-Reactive-System/3-Computed-Properties/1-计算属性Computed.md)**：介绍如何使用计算属性。

#### 4-Watchers (侦听器)
- **[1-Watch](04-Reactive-System/4-Watchers/1-Watch.md)**：讲解`watch`的使用。
- **[2-watchEffect](04-Reactive-System/4-Watchers/2-watchEffect.md)**：介绍`watchEffect`的使用场景和用法。

---

### [05-Component-Communication (组件通信)](05-Component-Communication/README.md)
本模块介绍了Vue 3中父子组件、祖孙组件之间的通信方式，以及插槽、事件等高级通信特性。

#### 01-Basic-Communication (基础通信)
- **[1-Props传值与类型定义](05-Component-Communication/01-Basic-Communication/1-Props传值与类型定义.md)**：讲解如何通过`Props`在组件之间传递数据，并进行类型定义。
- **[2-父子组件的Props通信](05-Component-Communication/01-Basic-Communication/2-父子组件的Props通信.md)**：介绍父子组件之间如何通过`Props`通信。
- **[3-父子组件的v-model双向数据绑定](05-Component-Communication/01-Basic-Communication/3-父子组件的v-model双向数据绑定.md)**：讲解如何通过`v-model`实现父子组件的双向绑定。

#### 02-Advanced-Communication (高级通信)
- **[1-Provide和Inject实现祖孙组件通信](05-Component-Communication/02-Advanced-Communication/1-Provide和Inject实现祖孙组件通信.md)**：介绍如何使用`Provide`和`Inject`来实现祖孙组件之间的通信。
- **[2-自定义事件](05-Component-Communication/02-Advanced-Communication/2-自定义事件.md)**：讲解自定义事件的使用方法。
- **[3-Mitt](05-Component-Communication/02-Advanced-Communication/3-Mitt.md)**：介绍使用Mitt实现事件总线。

#### 03-Additional-Features (附加功能)
- **[1-Slot插槽详解](05-Component-Communication/03-Additional-Features/1-Slot插槽详解.md)**：深入讲解Vue插槽的使用和应用。
- **[2-$attrs](./05-Component-Communication/03-Additional-Features/2-$attrs.md)**：介绍`$attrs`的作用及用法。
- **[3-$refs与$parent](./05-Component-Communication/03-Additional-Features/3-$refs与$parent.md)**：讲解`$refs`与`$parent`的使用场景。

---

### [06-Pinia (Pinia)](06-Pinia/README.md)
本模块介绍了Pinia状态管理库的基本概念和进阶使用。

#### 1-Pinia-Basics (基础)
- **[1-搭建Pinia环境](06-Pinia/1-Pinia-Basics/1-搭建Pinia环境.md)**：介绍如何搭建Pinia环境。

#### 2-State-Manage (状态管理)
- **[1-存储与读取数据](06-Pinia/2-State-Manage/1-存储与读取数据.md)**：讲解如何在Pinia中存储和读取数据。
- **[2-修改数据](06-Pinia/2-State-Manage/2-修改数据.md)**：介绍如何在Pinia中修改数据。
- **[3-StoreToRefs](06-Pinia/2-State-Manage/3-StoreToRefs.md)**：介绍如何通过`StoreToRefs`使store变得响应式。
- **[4-数据共享与响应式更新](06-Pinia/2-State-Manage/4-数据共享与响应式更新.md)**：讲解Pinia中如何实现数据共享和响应式更新。

#### 3-Advanced-Pinia (进阶)
- **[1-getters](06-Pinia/3-Advanced-Pinia/1-getters.md)**：介绍Pinia中的`getters`使用方法。
- **[2-使用$subscribe方法侦听state变化](./06-Pinia/3-Advanced-Pinia/2-使用$subscribe方法侦听state变化.md)**：讲解如何通过`$subscribe`方法监听state的变化。
- **[3-使用组合式API编写store](06-Pinia/3-Advanced-Pinia/3-使用组合式API编写store.md)**：介绍如何使用组合式API编写Pinia store。

---

### [07-Vue-Router (Vue 路由)](07-Vue-Router/README.md)
本模块介绍了Vue Router的基础配置、路由链接、路由守卫等功能。

#### 1-Router-Configuration (路由配置)
- **[1-安装和配置VueRouter](07-Vue-Router/1-Router-Configuration/1-安装和配置VueRouter.md)**：介绍如何安装和配置Vue Router。
- **[2-History模式和Hash模式](07-Vue-Router/1-Router-Configuration/2-HIstory模式和Hash模式.md)**：对比Vue Router中的History模式和Hash模式。
- **[3-路由组件与一般组件](07-Vue-Router/1-Router-Configuration/3-路由组件与一般组件.md)**：讲解如何区分路由组件与普通组件的使用。

#### 2-Route-Links-and-Guards (路由链接与守卫)
- **[1-三种路由链接形式](07-Vue-Router/2-Route-Links-and-Guards/1-三种路由链接形式.md)**：介绍Vue Router中的三种路由链接形式。
- **[2-Push和Replace](07-Vue-Router/2-Route-Links-and-Guards/2-Push和Replace.md)**：讲解`push`和`replace`方法的使用。

#### 3-Route-Params-and-Nested-Routes (路由参数与嵌套路由)
- **[1-Query传参](07-Vue-Router/3-Route-Params-and-Nested-Routes/1-Query传参.md)**：介绍如何通过Query传递路由参数。
- **[2-Params传参](07-Vue-Router/3-Route-Params-and-Nested-Routes/2-Params传参.md)**：讲解如何通过Params传递路由参数。
- **[3-Props配置对于路由传参的作用](07-Vue-Router/3-Route-Params-and-Nested-Routes/3-Props配置对于路由传参的作用.md)**：解释如何使用`props`配置来传递路由参数。
- **[4-编程式路由导航](07-Vue-Router/3-Route-Params-and-Nested-Routes/4-编程式路由导航.md)**：介绍如何使用编程式导航进行路由跳转。

---

### [08-Other-APIs (其他API)](08-Other-APIs/README.md)
本模块包含了Vue 3中一些常用的其他API。

#### 1-shallowRef-shallowReactive (浅响应数据)
- **[1-shallowRef-shallowReactive](08-Other-APIs/1-shallowRef-shallowReactive.md)**：介绍`shallowRef`和`shallowReactive`的使用。

#### 2-readonly-shallowReadonly (只读数据)
- **[2-readonly-shallowReadonly](08-Other-APIs/2-readonly-shallowReadonly.md)**：讲解`readonly`和`shallowReadonly`的用法。

#### 3-toRaw-markRaw (转化原始数据)
- **[3-toRaw-markRaw](08-Other-APIs/3-toRaw-markRaw.md)**：介绍`toRaw`和`markRaw`的作用。

---

### [09-Vue3-Features (Vue 3 新特性)](09-Vue3-Features/README.md)
本模块介绍了Vue 3的全新功能与特性，如`Teleport`、`Suspense`等。

#### 1-Teleport (Teleport)
- **[1-Teleport](09-Vue3-Features/1-Teleport.md)**：介绍Vue 3中的`Teleport`功能。

#### 2-Suspense (Suspense)
- **[2-Suspense](09-Vue3-Features/2-Suspense.md)**：讲解`Suspense`的使用场景与实现。

#### 3-全局API转移到应用对象 (Global API)
- **[3-全局API转移到应用对象](09-Vue3-Features/3-全局API转移到应用对象.md)**：解释Vue 3中全局API的转移和改进。

#### 4-其他新特性 (Other Features)
- **[4-其他新特性](09-Vue3-Features/4-其他新特性.md)**：介绍Vue 3中的其他新特性。

### [10-Build-Optimization (构建与优化)](10-Build-Optimization/README.md)

本模块介绍了如何通过配置和优化技术提升Vue 3项目的构建效率和运行性能。

#### 1-Vite-Configuration (Vite 配置)
- **[1-Vite配置基础](10-Build-Optimization/1-Vite-Configuration/1-Vite配置基础.md)**：讲解 Vite 的基本配置，包括如何设置开发和生产环境的配置。
- **[2-Vite插件](10-Build-Optimization/1-Vite-Configuration/2-Vite插件.md)**：介绍 Vite 中常用的插件，如何通过插件扩展 Vite 的功能。

#### 2-Code-Splitting-and-Lazy-Loading (代码拆分与懒加载)
- **[1-代码拆分概述](10-Build-Optimization/2-Code-Splitting-and-Lazy-Loading/1-代码拆分概述.md)**：讲解如何使用 Webpack 或 Vite 进行代码拆分，优化应用的加载速度。
- **[2-懒加载组件](10-Build-Optimization/2-Code-Splitting-and-Lazy-Loading/2-懒加载组件.md)**：介绍如何在 Vue 中使用懒加载技术，按需加载组件，提高初始加载速度。

#### 3-Performance-Optimization (性能优化)
- **[1-性能优化概述](10-Build-Optimization/3-Performance-Optimization/1-性能优化概述.md)**：介绍前端性能优化的基本概念和常见的优化方法。
- **[2-图片优化](10-Build-Optimization/3-Performance-Optimization/2-图片优化.md)**：探讨如何优化图片资源，减小图片体积，提高加载速度。
- **[3-缓存与CDN](10-Build-Optimization/3-Performance-Optimization/3-缓存与CDN.md)**：讲解如何使用缓存和内容分发网络（CDN）加速资源加载，减少服务器负担。
