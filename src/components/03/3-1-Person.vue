<template>
  <div class="person">
    姓：<input type="text" v-model="firstName" /> <br />
    名：<input type="text" v-model="lastName" /> <br />
    全名：<span>{{ fullName }}</span> <br />
    <button @click="changeDefaultName">全名改为：Jackson-He</button>
    <button @click="SwtichFullName">将{{ firstName }}与{{ lastName }}交换</button>
  </div>
</template>

<script setup lang="ts" name="Person">
import { ref, computed } from "vue";

let firstName = ref("Jackson");
let lastName = ref("He");

// 计算属性——既读取又修改
let fullName = computed({
  // 读取
  get() {
    return firstName.value + "-" + lastName.value;
  },
  // 修改
  set(val) {
    console.log("有人修改了fullName", val);
    firstName.value = val.split("-")[0];
    lastName.value = val.split("-")[1];
  },
});

function changeDefaultName() {
  fullName.value = "Jackson-He";
}

function SwtichFullName() {
  [firstName.value, lastName.value] = [lastName.value, firstName.value];
}
</script>

<style scoped lang="scss">
.person {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 20px auto;
  background-color: #f9f9f9;

  input[type="text"] {
    width: calc(100% - 22px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: $vue;
      outline: none;
    }
  }

  span {
    font-weight: bold;
    color: $vue;
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

    &:hover {
      background-color: $vue-darker
    }
  }
}

</style>
