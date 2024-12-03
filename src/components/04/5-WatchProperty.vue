<template>
  <div class="person">
    <h1>监视【ref】或【reactive】定义的【对象类型】数据中的某个属性</h1>
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
import { reactive, watch } from 'vue'

// 数据
let person = reactive({
  name: 'Jackson',
  age: 20,
  car: {
    c1: '小米Su7 Pro',
    c2: '小米Su7 Max'
  }
})

// 方法
function changeName() {
  person.name += 'n'
}

function changeAge() {
  person.age += 1
}

function changeC1() {
  person.car.c1 = '特斯拉Model3'
}

function changeC2() {
  person.car.c2 = '特斯拉ModelY'
}

function changeCar() {
  person.car = { c1: '雅迪', c2: '爱玛' }
}

// 监视，情况四：监视响应式对象中的某个属性，且该属性是基本类型的，要写成函数式
watch(() => person.name, (newValue, oldValue) => {
  console.log('person.name变化了', oldValue, newValue)
})

// 监视，情况四：监视响应式对象中的某个属性，且该属性是对象类型的，可以直接写，也能写函数，更推荐写函数
watch(() => person.car, (newValue, oldValue) => {
  console.log('person.car变化了', oldValue, newValue)
}, { deep: true })
</script>

