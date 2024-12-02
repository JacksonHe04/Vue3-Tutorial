<template>
  <div v-html="compiledMarkdown"></div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import markdownItHighlightjs from 'markdown-it-highlightjs'
import markdownItCodeCopy from 'markdown-it-code-copy'

export default {
  name: 'MarkdownRenderer',
  props: {
    // 接收Markdown文件的路径
    filePath: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      compiledMarkdown: ''
    }
  },
  async mounted() {
    await this.loadMarkdown()
  },
  methods: {
    async loadMarkdown() {
      // 使用Vite提供的import.meta.url来读取markdown文件
      const markdownModule = await import(`../../${this.filePath}`)
      const markdownText = markdownModule.default || markdownModule

      // 创建Markdown解析器
      const md = new MarkdownIt().use(markdownItHighlightjs).use(markdownItCodeCopy)
      this.compiledMarkdown = md.render(markdownText)
    }
  }
}
</script>

<style scoped>
/* 你可以在这里添加Markdown渲染的样式 */
</style>
