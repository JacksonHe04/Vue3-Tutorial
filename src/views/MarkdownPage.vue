<!-- src/views/MarkdownPage.vue -->
<template>
  <MarkDown :mdPath="mdPath" />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import MarkDown from "@/utils/MarkDown.vue";

const route = useRoute();
const mdPath = computed(() => {
  if (route.params.folder && route.params.file) {
    // 检查是否存在第二个文件夹层级
    if (route.params.subFolder) {
      return `${route.params.folder}/${route.params.subFolder}/${route.params.file}.md`;
    }
    return `${route.params.folder}/${route.params.file}.md`;
  } else if (route.params.folder) {
    // 如果只有 folder 参数，返回 README.md
    return `${route.params.folder}/README.md`;
  }
  return "";
});
</script>
