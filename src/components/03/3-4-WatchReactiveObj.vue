<template>
  <div class="person">
    <h1>情况三：监视【reactive】定义的【对象类型】数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
    <hr>
    <h2>测试：{{ obj.a.b.c }}</h2>
    <button @click="test">修改obj.a.b.c</button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'

// 数据
let person = reactive({
  name: '张三',
  age: 18
})

let obj = reactive({
  a: {
    b: {
      c: 666
    }
  }
})

// 方法
function changeName() {
  person.name += '~'
}

function changeAge() {
  person.age += 1
}

function changePerson() {
  Object.assign(person, { name: '李四', age: 80 })
}

function test() {
  obj.a.b.c = 888
}

// 监视，情况三：监视【reactive】定义的【对象类型】数据，默认开启深度监视
watch(person, (newValue, oldValue) => {
  console.log('person变化了', newValue, oldValue)
})

watch(obj, (newValue, oldValue) => {
  console.log('obj变化了', newValue, oldValue)
})
</script>

