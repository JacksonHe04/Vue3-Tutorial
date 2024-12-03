// 创建一个路由器，并暴露出去
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";

import Home from "@/views/Home/index.vue";
import MarkdownPage from "@/views/MarkdownPage.vue";
const router = createRouter({
  // 路由模式
  history: createWebHistory(),
  // 路由表
  routes: [
    {
      name: "Layout",
      path: "/",
      component: () => import("@/views/Layout/index.vue"),
      children: [
        {
          name: "Home",
          path: "",
          component: () => import("@/views/Home/index.vue"),
          meta: {
            title: "首页",
          },
        },
        // {
        //   name: "01",
        //   path: "01-Overview",
        //   component: () => import("@/views/01/index.vue"),
        //   meta: {
        //     title: "总览",
        //   },
        // },
        // {
        //   name: "02",
        //   path: "02-Vue-Basics",
        //   component: () => import("@/views/02/index.vue"),
        //   meta: {
        //     title: "Vue基础",
        //   },
        // },
        // {
        //   name: "03",
        //   path: "03-Composition-API",
        //   component: () => import("@/views/03/index.vue"),
        //   meta: {
        //     title: "组合式API",
        //   },
        // },
        // {
        //   name: "04",
        //   path: "04-Reactive-System",
        //   component: () => import("@/views/04/index.vue"),
        //   meta: {
        //     title: "响应式系统",
        //   },
        // },
        // {
        //   name: "05",
        //   path: "05-Component-Communication",
        //   component: () => import("@/views/05/index.vue"),
        //   meta: {
        //     title: "组件通信",
        //   },
        // },
        // {
        //   name: "06",
        //   path: "06-Pinia",
        //   component: () => import("@/views/06/index.vue"),
        //   meta: {
        //     title: "Pinia",
        //   },
        // },
        // {
        //   name: "07",
        //   path: "07-Vue-Router",
        //   component: () => import("@/views/07/index.vue"),
        //   meta: {
        //     title: "Vue Router",
        //   },
        // },
        // {
        //   name: "08",
        //   path: "08-Other-APIs",
        //   component: () => import("@/views/08/index.vue"),
        //   meta: {
        //     title: "Vue APIs",
        //   },
        // },
        // {
        //   name: "09",
        //   path: "09-Vue3-Features",
        //   component: () => import("@/views/09/index.vue"),
        //   meta: {
        //     title: "Vue3新特性",
        //   },
        // },
        // {
        //   name: "10",
        //   path: "10-Build-Optimization",
        //   component: () => import("@/views/10/index.vue"),
        //   meta: {
        //     title: "构建与优化",
        //   },
        // },

        {
          path: ":folder",
          name: "MarkdownFolderPage",
          component: MarkdownPage,
        },
        {
          path: ":folder/:file.html", // 匹配所有以 .md 结尾的路径
          name: "MarkdownPage",
          component: MarkdownPage,
        },
        {
          path: ":folder/:subFolder/:file.html", // 匹配所有以 .md 结尾的路径，且路径中有两个文件夹层级
          name: "NestedMarkdownPage",
          component: MarkdownPage,
        },
      ],
    },
  ],
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const mdPattern = /\.md$/;
  if (mdPattern.test(to.path)) {
    const newPath = to.path.replace(mdPattern, '.html');
    next(newPath);
  } else {
    next();
  }
});

export default router;
