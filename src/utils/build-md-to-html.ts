// src/utils/build-md-to-html.ts
import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import markdownIt from 'markdown-it';
import markdownItHighlightjs from 'markdown-it-highlightjs';
import markdownItCodeCopy from 'markdown-it-code-copy';

function buildMdToHtml(): Plugin {
  return {
    name: 'build-md-to-html',
    async buildStart() {
      const docsDir = path.resolve(__dirname, '../docs');
      const outputDir = path.resolve(__dirname, '../dist/docs');

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      function processDirectory(dirPath: string) {
        const files = fs.readdirSync(dirPath);

        files.forEach((file) => {
          const filePath = path.join(dirPath, file);
          const stat = fs.statSync(filePath);

          if (stat.isDirectory()) {
            processDirectory(filePath);
          } else if (file.endsWith('.md')) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const md = markdownIt()
              .use(markdownItHighlightjs)
              .use(markdownItCodeCopy, {
                buttonText: '复制',
              });

            const htmlContent = md.render(content);
            const outputPath = path.join(outputDir, path.relative(docsDir, filePath)).replace(/\.md$/, '.html');
            const outputDirPath = path.dirname(outputPath);

            if (!fs.existsSync(outputDirPath)) {
              fs.mkdirSync(outputDirPath, { recursive: true });
            }

            fs.writeFileSync(outputPath, htmlContent, 'utf-8');
            console.log(`Generated HTML for ${filePath} at ${outputPath}`);
          }
        });
      }

      processDirectory(docsDir);
    },
  };
}

export default buildMdToHtml;
