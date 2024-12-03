# 搭建 Pinia 环境

本文将介绍如何在 Vue 3 项目中搭建 Pinia 环境。Pinia 是 Vue 3 官方推荐的状态管理库，具有更简洁和高效的 API。通过以下步骤，可以轻松地在项目中引入并配置 Pinia。

## 第一步：安装 Pinia

首先，需要安装 Pinia。打开终端，进入项目文件夹并执行以下命令：

```bash
npm install pinia
```

这将会安装 Pinia 库及其依赖。

## 第二步：配置 Pinia

在安装完成后，我们需要在 Vue 3 项目中配置 Pinia。在 `src/main.ts` 文件中引入并创建 Pinia 实例。

```ts
import { createApp } from 'vue'
import App from './App.vue'

/* 引入 createPinia，用于创建 pinia */
import { createPinia } from 'pinia'

/* 创建 pinia */
const pinia = createPinia()
const app = createApp(App)

/* 使用插件 */
app.use(pinia)
app.mount('#app')
```

### 说明：
1. 我们首先引入 `createPinia` 函数，并在应用中创建一个 Pinia 实例。
2. 使用 `app.use(pinia)` 将 Pinia 插件注册到 Vue 实例中。
3. 最后，通过 `app.mount('#app')` 将 Vue 应用挂载到 DOM 元素中。

完成以上操作后，开发者工具中会自动出现 `pinia` 选项，您可以在这里查看和调试状态管理相关的内容。

### 开发者工具界面

此时，打开浏览器的开发者工具，您将能够看到 `pinia` 选项，表示 Pinia 已成功集成到项目中。

通过这些步骤，您已经完成了在 Vue 3 项目中搭建 Pinia 环境的基本配置。接下来，您可以开始使用 Pinia 来管理全局状态，创建和操作 Store。