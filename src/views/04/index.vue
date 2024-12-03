<script setup lang="ts">
import Person from "@/components/04/1-Person.vue";
import WatchRefBasic from "@/components/04/2-WatchRefBasic.vue";
import WatchRefObj from "@/components/04/3-WatchRefObj.vue";
import WatchReactiveObj from "@/components/04/4-WatchReactiveObj.vue";
import WatchProperty from "@/components/04/5-WatchProperty.vue";
import MultipleData from "@/components/04/6-MultipleData.vue";
import MarkDown from "@/views/04/MarkDown.vue";
import WatchEffect from "@/components/04/7-WatchEffect.vue";
import RefInDOM from "@/components/04/8-RefInDOM.vue";
import RefInCom from "@/components/04/9-RefInCom.vue";
</script>

<template>
  <MarkDown />
  <div class="com-show">
    <Person />
    <WatchRefBasic />
    <WatchRefObj />
    <WatchReactiveObj />
    <WatchProperty />
    <MultipleData />
    <WatchEffect />
    <RefInDOM />
    <RefInCom />
  </div>
</template>

<style lang="scss">
.com-show {
  display: flex;
  justify-content: space-around; /* 或者使用 space-between, center 等根据需求调整 */
  flex-wrap: wrap; /* 如果需要换行 */
  padding: 0 100px;
}

.com-show > * {
  flex: 1 1 calc(33.333% - 20px); /* 每个组件占据大约三分之一的宽度，减去间距 */
}

.person {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 20px auto;
  background-color: #f9f9f9;

  h1 {
    font-size: 20px;
  }
  h2 {
    font-size: 16px;
    margin-bottom: 20px;
  }
  h3 {
    font-size: 14px;
  }

  button {
    padding: 10px 15px;
    background-color: $vue;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 20px;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: $vue-darker;
    }
  }
}
</style>
