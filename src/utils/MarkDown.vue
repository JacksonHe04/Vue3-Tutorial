<template>
  <div class="markdown-content" v-html="mdContent"></div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  mdPath: {
    type: String,
    required: true
  }
});

const mdContent = ref('');
const router = useRouter();

watchEffect(async () => {
  if (props.mdPath) {
    try {
      const response = await import(`../../docs/${props.mdPath}`);
      mdContent.value = response.default;
    } catch (error) {
      console.error('Failed to load Markdown file:', error);
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
        // 获取当前Markdown文件所在的文件夹路径
        const currentFolderPath = props.mdPath.split('/').slice(0, -1).join('/');
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
