<template>
  <div class="markdown-content" v-html="mdContent"></div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
const props = defineProps({
  mdPath: {
    type: String,
    required: true
  }
});

const mdContent = ref('');
watchEffect(async () => {
  if (props.mdPath) {
    try {
      const response = await import(`../../${props.mdPath}`);
      mdContent.value = response.default;
    } catch (error) {
      console.error('Failed to load Markdown file:', error);
    }
  }
});
</script>

<style>
@import "@/assets/markdown.scss";
</style>
