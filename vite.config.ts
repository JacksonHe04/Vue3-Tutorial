// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { resolve } from "path";
import markdownDynamicImport from "./src/utils/markdown-dynamic-import";
// import buildMdToHtml from "@/utils/build-md-to-html.js"; // 引入新的插件

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VueSetupExtend(),
    markdownDynamicImport(),
  ],
  // base: '/Vue3-Tutorial/',
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/assets/color.scss' as *;`,
      },
    },
  },
});

console.log("Vite config loaded");
