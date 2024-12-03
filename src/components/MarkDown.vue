<template>
  <div class="markdown-content" v-if="htmlContent" v-html="htmlContent"></div>
  <div v-else>加载中...</div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  htmlPath: {
    type: String,
    required: true
  }
});

const htmlContent = ref('');
const router = useRouter();

watchEffect(async () => {
  if (props.htmlPath) {
    try {
      console.log('props.htmlPath:', props.htmlPath);
      const response = await fetch(`/docs/${props.htmlPath}`);
      if (!response.ok) {
        throw new Error(`Failed to load HTML file: ${response.statusText}`);
      }
      htmlContent.value = await response.text();
    } catch (error) {
      console.error('Failed to load HTML file:', error);
    }
  }
});

onMounted(() => {
  const links = document.querySelectorAll('.markdown-content a');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      if (href.startsWith('./')) {
        // 获取当前HTML文件所在的文件夹路径
        const currentFolderPath = props.htmlPath.split('/').slice(0, -1).join('/');
        // 构建绝对路径
        const absolutePath = `${currentFolderPath}/${href.slice(2)}`;
        // 使用Vue Router进行导航
        router.push(`/${absolutePath}`);
      } else {
        window.location.href = href;
      }
    });
  });
});
</script>

<style>
@import "@/assets/markdown.scss";
</style>
