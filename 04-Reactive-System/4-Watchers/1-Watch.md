# Vue 3中的`watch`

## 作用

`watch` 是 Vue 3 中用来监视数据变化的一个特性，与 Vue 2 中的 `watch` 作用一致。它可以帮助我们在数据发生变化时执行一些操作，常用于执行异步任务或复杂的操作，或是需要在数据变化时执行某些副作用（如获取新的数据、更新 UI 等）。

### 特点

在 Vue 3 中，`watch` 只能监视以下四种数据类型：

1. `ref` 定义的数据。
2. `reactive` 定义的数据。
3. 函数返回一个值（`getter` 函数）。
4. 包含以上数据类型的数组。

## 使用场景

在 Vue 3 中，使用 `watch` 时通常会遇到以下几种常见情况。

### 情况一：监视 `ref` 定义的【基本类型】数据

当 `ref` 定义的是基本数据类型（如数字、字符串、布尔值等）时，监视的是其 `value` 值的变化。

```vue
<template>
  <div class="person">
    <h1>情况一：监视【ref】定义的【基本类型】数据</h1>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changeSum">点我sum+1</button>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'

  // 数据
  let sum = ref(0)

  // 方法
  function changeSum() {
    sum.value += 1
  }

  // 监视，情况一：监视【ref】定义的【基本类型】数据
  const stopWatch = watch(sum, (newValue, oldValue) => {
    console.log('sum变化了', newValue, oldValue)
    if (newValue >= 10) {
      stopWatch()  // 停止监视
    }
  })
</script>
```

### 情况二：监视 `ref` 定义的【对象类型】数据

对于对象类型的数据，`watch` 监视的是对象的地址值。如果修改对象内部的某个属性，需要手动开启深度监视。

```vue
<template>
  <div class="person">
    <h1>情况二：监视【ref】定义的【对象类型】数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'

  // 数据
  let person = ref({
    name: '张三',
    age: 18
  })

  // 方法
  function changeName() {
    person.value.name += '~'
  }

  function changeAge() {
    person.value.age += 1
  }

  function changePerson() {
    person.value = { name: '李四', age: 90 }
  }

  // 监视，情况二：监视【ref】定义的【对象类型】数据
  watch(person, (newValue, oldValue) => {
    console.log('person变化了', newValue, oldValue)
  }, { deep: true })
</script>
```

### 情况三：监视 `reactive` 定义的【对象类型】数据

当使用 `reactive` 定义对象时，`watch` 默认会开启深度监视，即监视对象内部的所有属性。

```vue
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
```

### 情况四：监视 `ref` 或 `reactive` 定义的【对象类型】数据中的某个属性

对于对象中的某个属性，建议将其写成函数形式，以确保能正确地监视该属性的变化。若是对象类型的属性，通常要手动开启深度监视。

```vue
<template>
  <div class="person">
    <h1>情况四：监视【ref】或【reactive】定义的【对象类型】数据中的某个属性</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>汽车：{{ person.car.c1 }}、{{ person.car.c2 }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一台车</button>
    <button @click="changeC2">修改第二台车</button>
    <button @click="changeCar">修改整个车</button>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, watch } from 'vue'

  // 数据
  let person = reactive({
    name: '张三',
    age: 18,
    car: {
      c1: '奔驰',
      c2: '宝马'
    }
  })

  // 方法
  function changeName() {
    person.name += '~'
  }

  function changeAge() {
    person.age += 1
  }

  function changeC1() {
    person.car.c1 = '奥迪'
  }

  function changeC2() {
    person.car.c2 = '大众'
  }

  function changeCar() {
    person.car = { c1: '雅迪', c2: '爱玛' }
  }

  // 监视，情况四：监视响应式对象中的某个属性，且该属性是基本类型的，要写成函数式
  watch(() => person.name, (newValue, oldValue) => {
    console.log('person.name变化了', newValue, oldValue)
  })

  // 监视，情况四：监视响应式对象中的某个属性，且该属性是对象类型的，可以直接写，也能写函数，更推荐写函数
  watch(() => person.car, (newValue, oldValue) => {
    console.log('person.car变化了', newValue, oldValue)
  }, { deep: true })
</script>
```

### 情况五：监视多个数据

`watch` 也可以同时监视多个数据，传入一个包含多个数据的数组。

```vue
<template>
  <div class="person">
    <h1>情况五：监视上述的多个数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>汽车：{{ person.car.c1 }}、{{ person.car.c2 }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一台车</button>
    <button @click="changeC2">修改第二台车</button>
    <button @click="changeCar">修改整个车</button>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, watch } from 'vue'

  // 数据
  let person = reactive({
    name: '张三',
    age: 18,
    car: {
      c1: '奔驰',
      c2: '宝马'
    }
  })

  // 方法
  function changeName() {
   

 person.name += '~'
  }

  function changeAge() {
    person.age += 1
  }

  function changeC1() {
    person.car.c1 = '奥迪'
  }

  function changeC2() {
    person.car.c2 = '大众'
  }

  function changeCar() {
    person.car = { c1: '雅迪', c2: '爱玛' }
  }

  // 监视，情况五：监视多个数据
  watch([() => person.name, () => person.age], ([newName, newAge], [oldName, oldAge]) => {
    console.log(`name变化了：${newName} -> ${oldName}`)
    console.log(`age变化了：${newAge} -> ${oldAge}`)
  })
</script>
```

## 结论

Vue 3 的 `watch` 提供了一种灵活的方式来监视数据的变化，可以根据不同的使用场景来选择监视数据的方式。通过传入不同的参数，`watch` 允许我们精确地控制数据变化时要执行的操作。在需要响应某些数据变化时，使用 `watch` 可以帮助我们实现更复杂的逻辑，比如动态加载数据、调整 UI 状态、发起网络请求等。