// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { resolve } from "path";
import markdownDynamicImport from "./src/utils/markdown-dynamic-import";
import buildMdToHtml from "./src/utils/build-md-to-html"; // 引入新的插件

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VueSetupExtend(),
    markdownDynamicImport(),
    buildMdToHtml(),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
      {
        find: 'docs',
        replacement: resolve(__dirname, 'docs'), // 确保你设置了正确的路径别名
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
  build: {

    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
});

console.log("Vite config loaded");
