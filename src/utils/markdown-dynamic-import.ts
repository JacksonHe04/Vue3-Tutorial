// src/utils/markdown-dynamic-import.ts
import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import markdownIt from 'markdown-it';
import markdownItHighlightjs from 'markdown-it-highlightjs';
import markdownItCodeCopy from 'markdown-it-code-copy';

function markdownDynamicImport(): Plugin {
  return {
    name: 'markdown-dynamic-import',
    async transform(src, id) {
      if (id.includes('.md')) {
        const md = markdownIt()
          .use(markdownItHighlightjs)
          .use(markdownItCodeCopy, {
            buttonText: '复制',
          });

        const content = md.render(src);
        console.log(`${id} 文档被解析成了HTML`); // 添加调试信息
        return {
          code: `export default ${JSON.stringify(content)}`,
          map: null,
        };
      }
    },
    async resolveId(id) {
      if (id.endsWith('.md')) {
        const filePath = path.resolve(__dirname, 'src/docs', id); // 使用正确的路径
        if (fs.existsSync(filePath)) {
          return id;
        }
      }
    },

    async load(id) {
      if (id.endsWith('.md')) {
        const filePath = path.resolve(__dirname, 'src/docs', id); // 使用正确的路径
        const content = fs.readFileSync(filePath, 'utf-8');
        return content;
      }
    }
  };
}

export default markdownDynamicImport;
