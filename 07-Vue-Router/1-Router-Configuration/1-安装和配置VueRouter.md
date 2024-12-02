## 安装和配置 Vue Router：在 Vue 项目中添加路由功能

Vue Router 是 Vue.ts 官方的路由管理器，能够帮助你在 Vue 项目中实现页面间的跳转和导航。通过 Vue Router，你可以在单页面应用（SPA）中管理不同的视图和组件。

### 1. 安装 Vue Router

首先，在你的 Vue 项目中安装 Vue Router。如果你的项目是使用 Vue 3 搭建的，可以按照以下步骤进行安装。

#### 使用 npm 安装

在项目根目录下打开终端，执行以下命令：

```bash
npm install vue-router@4
```

如果使用的是 Yarn，可以执行：

```bash
yarn add vue-router@4
```

### 2. 配置 Vue Router

安装完成后，需要在项目中配置 Vue Router。以下是详细的配置步骤：

#### 创建路由文件

在 `src` 目录下，创建一个新的文件夹 `router`，并在其中创建一个 `index.ts` 文件（你也可以选择其他名称，但通常使用 `index.ts`）。

```bash
src/
 ├── router/
 │    └── index.ts
```

#### 在 `index.ts` 中配置路由

在 `src/router/index.ts` 中，首先导入 `createRouter` 和 `createWebHistory`，然后创建路由配置对象，定义不同的路由规则。一个路由规则通常包含一个 `path`（路径）和一个 `component`（对应的组件）。

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
```

- `createWebHistory()` 是 Vue 3 推荐的历史模式，可以去掉 URL 中的 `#`，使 URL 看起来更干净。
- `routes` 是路由配置数组，每个对象表示一个路由规则。

#### 修改 `main.ts` 引入 Vue Router

在 `src/main.ts` 中，引入并注册 Vue Router。

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)  // 使用 Vue Router
app.mount('#app')
```

### 3. 创建视图组件

为了让路由能够渲染出对应的页面，你需要创建相应的 Vue 组件。假设你有两个页面，`Home.vue` 和 `About.vue`，你可以将它们放在 `src/views` 目录下。

例如，`Home.vue`：

```vue
<template>
  <div>
    <h1>首页</h1>
    <p>欢迎来到首页！</p>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
```

`About.vue`：

```vue
<template>
  <div>
    <h1>关于我们</h1>
    <p>这是关于我们页面。</p>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>
```

### 4. 使用 `<router-view>` 显示页面

在你的主组件 `App.vue` 中，你需要在页面的适当位置添加 `<router-view>` 标签，这样 Vue Router 会根据当前的路由渲染出相应的组件。

```vue
<template>
  <div>
    <h1>欢迎来到我的网站</h1>
    <nav>
      <ul>
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/about">关于我们</router-link></li>
      </ul>
    </nav>

    <!-- 路由视图 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

- `<router-view>` 是一个占位符，Vue Router 会在这里渲染匹配的组件。
- `<router-link>` 用来定义路由链接，点击后会触发路由跳转。

### 5. 运行项目

现在，你已经成功配置了 Vue Router。可以运行你的项目来查看效果。

```bash
npm run dev
```

访问 `http://localhost:3000/`，你应该能够在导航中看到“首页”和“关于我们”两个链接，点击链接后会切换显示不同的页面。

### 小结

1. **安装 Vue Router**：使用 `npm install vue-router@4` 安装 Vue Router。
2. **配置路由**：在 `src/router/index.ts` 中定义路由规则，指定路径和组件的映射关系。
3. **注册路由**：在 `src/main.ts` 中使用 `app.use(router)` 来注册路由。
4. **使用路由视图和链接**：通过 `<router-view>` 和 `<router-link>` 在模板中显示路由内容和导航链接。

这样，你就可以在 Vue 项目中成功实现基本的页面跳转功能。