<template>
  <div class="layout">
    <header class="header">
      <RouterLink to="/">
        <h1>Vue3 Tutorial</h1>
      </RouterLink>
      <nav>
        <RouterLink v-for="item in navs" :key="item.path" :to="item.path" class="nav-link">
          {{ item.meta.title }}
        </RouterLink>
      </nav>
    </header>
    <main class="main-content">
      <RouterView />
    </main>
    <footer class="footer">
      <p>&copy; 2024 Vue3-Tutorial By <a href="https://github.com/JacksonHe04">JacksonHe</a></p>
    </footer>
  </div>
</template>

<script setup lang="js">
const navs = [
  {
    path: "/",
    meta: {
      title: "首页",
    },
  },
  {
    path: "/01",
    meta: {
      title: "总览",
    },
  },
  {
    path: "/02",
    meta: {
      title: "Vue基础",
    },
  },
  {
    path: "/03",
    meta: {
      title: "组件化开发",
    },
  },
  {
    path: "/04",
    meta: {
      title: "响应式系统",
    },
  },
  {
    path: "/05",
    meta: {
      title: "Vue Router",
    },
  },
  {
    path: "/06",
    meta: {
      title: "Pinia",
    },
  },
  {
    path: "/07",
    meta: {
      title: "组件式API",
    },
  },
  {
    path: "/08",
    meta: {
      title: "Vue3新特性",
    },
  },
  {
    path: "/09",
    meta: {
      title: "测试与调试",
    },
  },
  {
    path: "/10",
    meta: {
      title: "构建与优化",
    },
  }
]
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
}

.header nav {
  display: flex;
}

.header nav a {
  margin-left: 1rem;
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;
}

.header nav a:hover {
  color: $vue; /* Vue green */
}

.header nav a.router-link-exact-active {
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
