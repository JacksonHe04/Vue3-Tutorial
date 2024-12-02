import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { resolve } from "path";
import path from 'path';
import fs from 'fs';
import markdownIt from 'markdown-it';
import markdownItHighlightjs from 'markdown-it-highlightjs';
import markdownItCodeCopy from 'markdown-it-code-copy';

export default defineConfig({
  plugins: [
      vue(), vueDevTools(), VueSetupExtend(),
    {
      name: 'markdown-loader',
      transform(src, id) {
        if (id.endsWith('.md')) {
          // 使用markdown-it进行解析
          const md = markdownIt()
              .use(markdownItHighlightjs)  // 高亮插件
              .use(markdownItCodeCopy, {
                buttonText: '复制', // 自定义按钮文本
              });   // 复制代码插件

          const content = md.render(src);  // 渲染md文件内容
          return {
            code: `export default ${JSON.stringify(content)}`,  // 导出md内容
            map: null,  // 不需要source map
          };
        }
      },
    }
  ],
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
