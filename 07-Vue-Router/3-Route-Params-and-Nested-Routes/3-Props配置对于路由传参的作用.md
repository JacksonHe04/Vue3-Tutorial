# 路由props配置的作用及在`query`和`params`传参中的应用

在Vue Router中，路由的 `props` 配置允许我们将路由参数直接映射到组件的 `props` 中，从而简化组件内部对路由参数的访问方式。使用 `props` 配置，可以避免在组件内通过 `useRoute` 或 `toRefs` 获取路由对象，而是直接将路由的参数作为组件的 `props` 传入。

下面将详细讲解如何使用 `props` 配置，展示 `query` 和 `params` 传参时的区别和实现方式。

## 1. `props` 配置的作用

- **简化组件访问**：通过将路由参数作为 `props` 传递给组件，组件不再需要显式地访问 `route` 对象或 `useRoute`，只需像普通 `props` 一样使用它们。
- **提高代码可维护性**：组件无需关心如何从路由中提取参数，增强了组件的独立性和可重用性。

## 2. 配置 `props` 的方式

在 `router/index.ts` 中，可以为路由配置 `props: true` 或者自定义 `props` 函数。

- **`props: true`**：当配置为 `true` 时，所有路由的参数（`params` 和 `query`）都会自动映射为组件的 `props`。
- **自定义 `props`**：可以通过函数来指定哪些路由参数应该作为 `props` 传递给组件。

## 3. 示例代码

### 3.1 使用 `query` 传参并配置 `props`

当我们使用 `query` 传递参数时，路由参数会以查询字符串的形式出现在 URL 中。例如，`/news/detail?id=1`。如果路由配置了 `props: true`，那么查询字符串中的 `id` 参数会自动传递给组件作为 `props`。

#### 路由配置

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import News from '../views/News.vue'
import NewsDetail from '../views/NewsDetail.vue'

const routes = [
  {
    path: '/news',
    name: 'news',
    component: News,
    children: [
      {
        path: 'detail',
        name: 'detail',
        component: NewsDetail,
        props: true,  // 开启props配置，query中的id会作为props传入
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

#### `News.vue` 组件

在 `News.vue` 中，我们通过 `router-link` 传递 `query` 参数，并跳转到 `NewsDetail.vue`。

```vue
<!-- News.vue -->
<template>
  <div>
    <h1>新闻列表</h1>
    <ul>
      <li v-for="(news, index) in newsList" :key="news.id">
        <!-- 使用router-link传递新闻的id作为query -->
        <router-link :to="{ name: 'detail', query: { id: news.id } }">
          {{ news.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const newsList = reactive([
  { id: 1, title: '新闻 1', content: '新闻 1 内容' },
  { id: 2, title: '新闻 2', content: '新闻 2 内容' },
  { id: 3, title: '新闻 3', content: '新闻 3 内容' },
])
</script>
```

#### `NewsDetail.vue` 组件

在 `NewsDetail.vue` 中，我们可以直接通过 `props` 获取 `id` 参数，而不需要使用 `useRoute`。

```vue
<!-- NewsDetail.vue -->
<template>
  <div>
    <h1>新闻详情</h1>
    <ul>
      <li>新闻ID: {{ id }}</li>
      <li>内容: {{ getNewsContent(id) }}</li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true }  // 通过props接收id
})

const getNewsContent = (id) => {
  const newsList = [
    { id: '1', content: '新闻 1 内容' },
    { id: '2', content: '新闻 2 内容' },
    { id: '3', content: '新闻 3 内容' },
  ]
  return newsList.find(news => news.id === id)?.content || '内容不存在'
}
</script>
```

在这种配置下，`id` 直接作为 `props` 传递给 `NewsDetail.vue`，而不需要手动从路由中提取。

### 3.2 使用 `params` 传参并配置 `props`

当我们使用 `params` 传递参数时，参数会直接嵌入到 URL 路径中，例如 `/news/1/detail`。如果路由配置了 `props: true`，那么 `params` 中的参数会自动传递给组件作为 `props`。

#### 路由配置

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import News from '../views/News.vue'
import NewsDetail from '../views/NewsDetail.vue'

const routes = [
  {
    path: '/news',
    name: 'news',
    component: News,
    children: [
      {
        path: ':id/detail',  // 动态路由参数 :id
        name: 'detail',
        component: NewsDetail,
        props: true,  // 开启props配置，params中的id会作为props传入
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

#### `News.vue` 组件

在 `News.vue` 中，我们使用 `router-link` 传递 `params` 参数，跳转到 `/news/:id/detail`，并将 `id` 作为路径的一部分传递。

```vue
<!-- News.vue -->
<template>
  <div>
    <h1>新闻列表</h1>
    <ul>
      <li v-for="(news, index) in newsList" :key="news.id">
        <!-- 使用router-link传递新闻的id作为params -->
        <router-link :to="{ name: 'detail', params: { id: news.id } }">
          {{ news.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const newsList = reactive([
  { id: 1, title: '新闻 1', content: '新闻 1 内容' },
  { id: 2, title: '新闻 2', content: '新闻 2 内容' },
  { id: 3, title: '新闻 3', content: '新闻 3 内容' },
])
</script>
```

#### `NewsDetail.vue` 组件

在 `NewsDetail.vue` 中，`id` 会直接作为 `props` 传递给组件。

```vue
<!-- NewsDetail.vue -->
<template>
  <div>
    <h1>新闻详情</h1>
    <ul>
      <li>新闻ID: {{ id }}</li>
      <li>内容: {{ getNewsContent(id) }}</li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true }  // 通过props接收id
})

const getNewsContent = (id) => {
  const newsList = [
    { id: '1', content: '新闻 1 内容' },
    { id: '2', content: '新闻 2 内容' },
    { id: '3', content: '新闻 3 内容' },
  ]
  return newsList.find(news => news.id === id)?.content || '内容不存在'
}
</script>
```

在这个配置中，`id` 作为 `params` 参数自动传递给 `NewsDetail.vue` 组件的 `props`。

## 总结

- 使用 `props: true` 配置后，无论是 `query` 还是 `params`，路由参数都会自动传递给组件作为 `props`，从而简化了组件内部对路由参数的访问。
- **`query` 参数**：通过 URL 中的查询字符串传递，如 `/news/detail?id=1`，可以使用 `props: true` 将 `id` 作为 `props` 传递给组件。
- **`params` 参数**：通过动态路由参数传递，如 `/news/1/detail`，同样可以通过 `props: true` 将 `id` 作为 `props` 传递给组件。

通过这种方式，组件不再需要显式地使用 `useRoute` 或者 `toRefs` 来获取路由参数，使得组件更加简洁和独立。