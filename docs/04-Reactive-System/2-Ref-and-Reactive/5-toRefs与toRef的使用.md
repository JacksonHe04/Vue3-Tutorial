# Vue 3 中 `toRefs` 与 `toRef` 的使用

## 作用

`toRefs` 和 `toRef` 用于将一个响应式对象的每一个属性转换为 `ref` 对象，使得这些属性仍然保持响应式。

- **`toRefs`**：可以批量转换一个响应式对象中的所有属性。
- **`toRef`**：只转换一个响应式对象的单一属性。

## 语法

### `toRefs`

`toRefs` 将响应式对象中的每个属性都转换成 `ref` 对象。这样，你可以在模板中以简洁的方式访问和修改每个属性，同时保持它们的响应式能力。

```js
let { name, age, gender } = toRefs(person)
```

这里 `name`、`age` 和 `gender` 都变成了 `ref` 类型，因此在 JavaScript 中你需要使用 `.value` 来访问它们的值。

### `toRef`

`toRef` 将响应式对象中的单个属性转换为 `ref` 对象。

```js
let age = toRef(person, 'age')
```

`toRef` 只转换 `person` 对象中的 `age` 属性。

## 区别

- **`toRefs`**：用于转换响应式对象中的所有属性，可以批量转换。
- **`toRef`**：用于转换响应式对象中的单个属性，返回的是 `ref` 对象。

## 示例代码

以下是使用 `toRefs` 和 `toRef` 的示例，展示如何将响应式对象的属性转换为 `ref`，并保持响应式功能。

```vue
<template>
  <div class="person">
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>性别：{{ person.gender }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeGender">修改性别</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { ref, reactive, toRefs, toRef } from 'vue'

  // 创建一个响应式对象
  let person = reactive({ name: '张三', age: 18, gender: '男' })

  // 使用 toRefs 批量转换 person 对象中的属性
  let { name, age, gender } = toRefs(person)

  // 使用 toRef 转换 person 中的单个属性
  let ageRef = toRef(person, 'age')

  // 修改名字的函数
  function changeName() {
    name.value += '~'  // 修改 name 属性
  }

  // 修改年龄的函数
  function changeAge() {
    ageRef.value += 1  // 修改 age 属性
  }

  // 修改性别的函数
  function changeGender() {
    gender.value = '女'  // 修改 gender 属性
  }
</script>
```

## 代码解析

1. **响应式对象**：
    - `person` 是一个响应式对象，包含 `name`、`age` 和 `gender` 属性。

2. **使用 `toRefs` 批量转换**：
    - `let { name, age, gender } = toRefs(person)`：将 `person` 对象中的所有属性批量转换为 `ref` 对象。每个属性变为 `ref`，在 JavaScript 中可以通过 `.value` 来访问。

3. **使用 `toRef` 转换单一属性**：
    - `let ageRef = toRef(person, 'age')`：将 `person` 对象中的 `age` 属性转换为 `ref` 对象，使得 `ageRef` 成为响应式的，并可以通过 `.value` 访问。

4. **修改属性**：
    - `changeName`、`changeAge` 和 `changeGender` 方法分别通过 `.value` 修改对应属性的值。

## 总结

- **`toRefs`** 用于将响应式对象中的所有属性批量转换为 `ref`，使得每个属性都具有响应式能力。
- **`toRef`** 用于将响应式对象中的单个属性转换为 `ref`，可以更精细地控制哪些属性需要转换。
- 转换后的属性依然保持响应式，因此可以继续在模板中直接使用，也可以在 JavaScript 代码中通过 `.value` 访问和修改。

这两者的选择取决于你需要转换的对象属性数量。如果需要批量转换，使用 `toRefs`；如果只需转换一个属性，使用 `toRef`。