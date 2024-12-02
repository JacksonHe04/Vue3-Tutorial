// 创建一个路由器，并暴露出去
import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
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
        {
          name: "01",
          path: "01",
          component: () => import("@/views/01/index.vue"),
          meta: {
            title: "总览",
          },
        },
        {
          name: "02",
          path: "02",
          component: () => import("@/views/02/index.vue"),
          meta: {
            title: "Vue基础",
          },
        },
        {
          name: "03",
          path: "03",
          component: () => import("@/views/03/index.vue"),
          meta: {
            title: "组合式API",
          },
        },
        {
          name: "04",
          path: "04",
          component: () => import("@/views/04/index.vue"),
          meta: {
            title: "响应式系统",
          },
        },
        {
          name: "05",
          path: "05",
          component: () => import("@/views/05/index.vue"),
          meta: {
            title: "组件通信",
          },
        },
        {
          name: "06",
          path: "06",
          component: () => import("@/views/06/index.vue"),
          meta: {
            title: "Pinia",
          },
        },
        {
          name: "07",
          path: "07",
          component: () => import("@/views/07/index.vue"),
          meta: {
            title: "Vue Router",
          },
        },
        {
          name: "08",
          path: "08",
          component: () => import("@/views/08/index.vue"),
          meta: {
            title: "Vue3新特性",
          },
        },
        {
          name: "09",
          path: "09",
          component: () => import("@/views/09/index.vue"),
          meta: {
            title: "测试与调试",
          },
        },
          {
          name: "10",
          path: "10",
          component: () => import("@/views/10/index.vue"),
          meta: {
            title: "构建与优化",
          },
        },
      ],
    },
  ],
});
