<template>
  <div class="person">
    <h1>监视【reactive】定义的【对象类型】数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
    <hr>
    <h2>房子的房间的地板的灰尘量：{{ house.room.floor.dust }}</h2>
    <button @click="test">扫除灰尘</button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'

// 数据
let person = reactive({
  name: 'Jackson',
  age: 20
})

let house = reactive({
  room: {
    floor: {
      dust: 1000
    }
  }
})

// 方法
function changeName() {
  person.name += 'n'
}

function changeAge() {
  person.age += 1
}

function changePerson() {
  Object.assign(person, { name: '尤雨溪', age: 37 })
}

function test() {
  house.room.floor.dust = 0
}

// 监视，情况三：监视【reactive】定义的【对象类型】数据，默认开启深度监视
watch(person, (newValue, oldValue) => {
  console.log('person变化了', oldValue, newValue)
})

watch(house, (newValue, oldValue) => {
  console.log('房子变化了', oldValue, newValue)
})
</script>

