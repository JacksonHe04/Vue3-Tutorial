<template>
  <MarkDown :htmlPath="htmlPath" />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import MarkDown from "@/components/MarkDown.vue";

const route = useRoute();
const htmlPath = computed(() => {
  if (route.params.folder && route.params.file) {
    // 移除 .md 后缀并添加 .html 后缀
    const fileNameWithoutExt = route.params.file.replace(/\.md$/, '');
    // 检查是否存在第二个文件夹层级
    if (route.params.subFolder) {
      return `${route.params.folder}/${route.params.subFolder}/${fileNameWithoutExt}.html`;
    }
    return `${route.params.folder}/${fileNameWithoutExt}.html`;

  } else if (route.params.folder) {
    // 如果只有 folder 参数，返回 index.html
    return `${route.params.folder}/README.html`;
  }
  return "";
});
</script>
