<template>
  <div class="person">
    <h1>监视上述的多个数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>Cars：{{ person.car.c1 }}、{{ person.car.c2 }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一台车</button>
    <button @click="changeC2">修改第二台车</button>
    <button @click="changeCar">修改所有车</button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";

// 数据
let person = reactive({
  name: "Jackson",
  age: 20,
  car: {
    c1: "Model3",
    c2: "ModelY",
  },
});

// 方法
function changeName() {
  person.name += "n";
}

function changeAge() {
  person.age += 1;
}

function changeC1() {
  person.car.c1 = "Su7Pro";
}

function changeC2() {
  person.car.c2 = "Su7Max";
}

function changeCar() {
  person.car = { c1: "雅迪", c2: "爱玛" };
}

// 监视，情况五：监视多个数据
watch(
  [() => person.name, () => person.age],
  ([newName, newAge], [oldName, oldAge]) => {
    console.log("person.name或person.age变化了");
    console.log(`name：${oldName} -> ${newName}`);
    console.log(`age：${oldAge} -> ${newAge}`);
  },
);
</script>
