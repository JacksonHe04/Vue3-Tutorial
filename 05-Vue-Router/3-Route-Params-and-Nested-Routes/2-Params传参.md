# 嵌套路由的路由传参（params）

在Vue中，除了通过 `query` 传递参数外，还可以通过 `params` 进行路由参数的传递。`params` 适用于路由路径中直接包含动态参数，通常用在 `path` 中定义了动态路由段的情况。以下是如何在嵌套路由中使用 `params` 传递参数的示例。

## 1. 配置路由

在`router/index.ts`中，我们配置了两个路由，一个是父路由`/news`，另一个是子路由`/news/:id/detail`，其中 `:id` 是一个动态路由参数。子路由会根据 `id` 显示不同的新闻内容。

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
        path: ':id/detail', // 动态参数 :id
        name: 'detail',
        component: NewsDetail,
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

在这里，`/news/:id/detail` 路由中的 `:id` 是一个动态路由参数，表示新闻的 `id`。这个参数会从 URL 中获取。

## 2. `News.vue` 组件

在父组件 `News.vue` 中，使用 `reactive` 创建一个包含新闻数据的数组，并通过 `v-for` 渲染新闻列表。在点击某条新闻时，利用 `<router-link>` 跳转到子路由 `/news/:id/detail`，并通过 `params` 传递新闻的 `id`。

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

在这里，`<router-link>` 的 `:to` 属性使用了 `name` 属性指定跳转到名为 `detail` 的子路由，并通过 `params` 传递了新闻的 `id`。点击新闻标题后，URL 会变成类似 `/news/1/detail`。

## 3. `NewsDetail.vue` 组件

在子组件 `NewsDetail.vue` 中，使用 `useRoute` 获取当前路由对象，并通过 `route.params` 获取路由参数 `id`，然后根据传递的 `id` 显示具体的新闻内容。

```vue
<!-- NewsDetail.vue -->
<template>
  <div>
    <h1>新闻详情</h1>
    <ul>
      <li v-if="newsId">新闻ID: {{ newsId }}</li>
      <!-- 根据id查找新闻内容并显示 -->
      <li v-if="newsId">内容: {{ getNewsContent(newsId) }}</li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

// 获取路由的参数
const route = useRoute()

// 获取路由参数中的id
const newsId = route.params.id

// 根据新闻ID查找新闻内容
const getNewsContent = (id) => {
  const newsList = [
    { id: 1, content: '新闻 1 内容' },
    { id: 2, content: '新闻 2 内容' },
    { id: 3, content: '新闻 3 内容' },
  ]
  return newsList.find(news => news.id == id)?.content || '内容不存在'
}
</script>
```

在 `NewsDetail.vue` 中，使用 `useRoute` 获取当前路由对象，并通过 `route.params` 获取动态路由参数 `id`。然后根据 `id` 从新闻列表中查找并显示具体的新闻内容。

## 4. 结果

- 在 `News.vue` 页面中，你会看到一个新闻列表，每条新闻都是一个可点击的链接，点击后跳转到子路由 `/news/:id/detail`。
- 在 `NewsDetail.vue` 页面中，URL 中的 `id` 参数会自动传递给 `route.params.id`，然后根据该 `id` 查询并展示具体的新闻内容。

例如，当点击“新闻 1”时，URL 变为 `/news/1/detail`，`NewsDetail.vue` 会展示新闻ID为1的内容。

## 总结

通过 `Vue Router` 的嵌套路由，我们可以轻松地实现父子路由之间的参数传递。使用 `params` 可以将参数直接嵌入到路由路径中，这样在子路由中通过 `route.params` 直接获取并使用参数。`params` 适用于动态路由中传递参数的场景。