# 嵌套路由的路由传参（query）

在Vue中使用`Vue Router`实现嵌套路由，并在父子路由之间传递参数是非常常见的需求。以下是一个简单的示例，展示如何在`router/index.ts`中定义嵌套路由，并通过路由传参实现`News.vue`和`NewsDetail.vue`之间的交互。

## 1. 配置路由

在`router/index.ts`中，我们配置了两个路由，一个是父路由`/news`，另一个是子路由`/news/detail`，子路由会展示新闻的具体内容。

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

## 2. `News.vue` 组件

在父组件 `News.vue` 中，使用 `reactive` 创建一个包含新闻数据的数组，并使用 `v-for` 渲染新闻列表。在点击某条新闻时，利用`<router-link>`跳转到子路由 `/news/detail`，并通过 `query` 传递参数（新闻的`id`）。

```vue
<!-- News.vue -->
<template>
  <div>
    <h1>新闻列表</h1>
    <ul>
      <li v-for="(news, index) in newsList" :key="news.id">
        <!-- 使用router-link传递新闻的id -->
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

在这里，`<router-link>`的`:to`属性使用了 `name` 属性指定跳转到名为`detail`的子路由，并通过 `query` 将 `id` 作为参数传递。点击新闻标题后，URL 会变成类似 `/news/detail?id=1`。

## 3. `NewsDetail.vue` 组件

在子组件 `NewsDetail.vue` 中，我们通过 `toRefs(route)` 获取路由的 `query` 参数，然后根据传递的 `id` 显示具体的新闻内容。

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
import { toRefs } from 'vue'
import { useRoute } from 'vue-router'

// 获取路由的参数
const route = useRoute()
const { query } = toRefs(route)

// 获取传递的新闻ID
const newsId = query.value.id

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

在 `NewsDetail.vue` 中，使用 `useRoute` 获取当前路由对象，并通过 `toRefs(route)` 来解构出 `query` 参数（`id`）。然后根据 `id` 从新闻列表中查找并显示具体的新闻内容。

## 4. 结果

- 在 `News.vue` 页面中，你会看到一个新闻列表，每条新闻都是一个可点击的链接，点击后跳转到 `NewsDetail.vue`。
- 在 `NewsDetail.vue` 页面中，根据 URL 中的 `id` 查询并显示对应的新闻内容。

例如，当点击“新闻 1”时，URL 变为 `/news/detail?id=1`，`NewsDetail.vue` 会展示新闻ID为1的内容。

## 总结

通过 `Vue Router` 的嵌套路由，我们可以轻松地实现父子路由之间的参数传递。`<router-link>` 允许我们传递 `query` 参数，子路由可以通过 `useRoute` 获取并展示传递的参数。