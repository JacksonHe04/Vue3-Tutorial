<template>
  <div class="layout">
    <header class="header">
      <RouterLink to="/">
        <h1>Vue3 Tutorial</h1>
      </RouterLink>
      <nav>
        <RouterLink
          v-for="item in navs"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ 'router-link-active': isActive(item.path) }"
        >
          {{ item.meta.title }}
        </RouterLink>
      </nav>
    </header>
    <main class="main-content">
      <RouterView />
    </main>
    <footer class="footer">
      <p>
        &copy; 2024 Vue3-Tutorial By
        <a href="https://github.com/JacksonHe04">JacksonHe</a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
const navs = [
  {
    path: "/01-Overview/",
    meta: {
      title: "总览",
    },
  },
  {
    path: "/02-Vue-Basics/",
    meta: {
      title: "Vue基础",
    },
  },
  {
    path: "/03-Composition-API/",
    meta: {
      title: "组合式API",
    },
  },
  {
    path: "/04-Reactive-System/",
    meta: {
      title: "响应式系统",
    },
  },
  {
    path: "/05-Component-Communication/",
    meta: {
      title: "组件通信",
    },
  },
  {
    path: "/06-Pinia/",
    meta: {
      title: "Pinia",
    },
  },
  {
    path: "/07-Vue-Router/",
    meta: {
      title: "Vue Router",
    },
  },
  {
    path: "/08-Other-APIs/",
    meta: {
      title: "Vue APIs",
    },
  },
  {
    path: "/09-Vue3-Features/",
    meta: {
      title: "Vue3新特性",
    },
  },
  {
    path: "/10-Build-Optimization/",
    meta: {
      title: "构建与优化",
    },
  },
];

const isActive = (path) => {
  return route.path.includes(path);
};
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.header h1 {
  color: $vue;
  margin: 0;
  font-family: Arial;
}

.header nav {
  display: flex;
}

.header nav a {
  margin-left: 2rem; // 增加间距
  color: grey;
  text-decoration: none;
  transition: color 0.3s;
  font-weight: bold;
  position: relative; // 添加相对定位以便伪元素定位
}

.header nav a:not(:first-child)::before {
  content: "";
  position: absolute;
  left: -1rem; // 调整竖线的位置以适应新的间距
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 1em;
  background-color: #ccc; // 灰色竖分割线
}

.header nav a:hover {
  color: $vue; /* Vue green */
}

.header nav a.router-link-active {
  color: #42b983; /* Vue green */
}

.main-content {
  flex: 1;
  padding: 1rem;
  text-align: center;
}

.footer {
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #ccc;
}
</style>
