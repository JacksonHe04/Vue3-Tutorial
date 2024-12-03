# Vue 3 中的 `props` 传值与类型定义

在 Vue 3 中，`props` 用于父组件与子组件之间传递数据。为了增强类型安全性，我们可以使用 TypeScript 来限制传入的 `props` 的数据类型，确保组件间的数据传递符合预期。本文将介绍如何在 Vue 3 中使用 `props`，并结合 TypeScript 进行类型定义和限制。

## 1. 定义数据接口与类型

首先，我们需要定义一个接口来限制传入数据的格式。以 `Person` 为例，假设每个人对象具有 `id`、`name` 和 `age` 属性。

### 定义 `PersonInter` 接口

```ts
// 定义一个接口，限制每个Person对象的格式
export interface PersonInter {
  id: string;
  name: string;
  age: number;
}
```

接着，我们定义一个类型 `Persons`，它表示由多个 `PersonInter` 类型构成的数组。

```ts
// 定义一个自定义类型Persons
export type Persons = Array<PersonInter>;
```

## 2. 在父组件中使用 `props`

在父组件 `App.vue` 中，我们需要向子组件传递数据。这里我们使用了 `reactive` 来创建响应式的数据，并使用 `Persons` 类型来定义 `persons` 数组。

### `App.vue` 代码

```vue
<template>
  <Person :list="persons"/>
</template>

<script lang="ts" setup name="App">
  import Person from './components/Person.vue';
  import { reactive } from 'vue';
  import { type Persons } from './types';

  // 使用reactive创建响应式数据，类型为Persons
  let persons = reactive<Persons>([
    { id: 'e98219e12', name: '张三', age: 18 },
    { id: 'e98219e13', name: '李四', age: 19 },
    { id: 'e98219e14', name: '王五', age: 20 },
  ]);
</script>
```

在上述代码中，`persons` 数组包含了三个 `PersonInter` 类型的对象，并将其通过 `:list="persons"` 传递给子组件 `Person`。

## 3. 在子组件中接收和使用 `props`

在子组件 `Person.vue` 中，我们通过 `defineProps` 来接收父组件传递的 `props`。有三种常见的写法来定义和限制 `props` 的类型。

### 第一种写法：仅接收 `props`

```ts
// 第一种写法：仅接收
const props = defineProps(['list']);
```

此方法简单地接收 `list` 作为 `props`，但是它没有类型约束，适用于没有类型需求的场景。

### 第二种写法：接收并限制类型

```ts
// 第二种写法：接收+限制类型
defineProps<{ list: Persons }>();
```

这种写法明确指定 `list` 为 `Persons` 类型，确保父组件传递的数据符合预期的结构。

### 第三种写法：接收、限制类型、指定默认值和必要性

```ts
// 第三种写法：接收+限制类型+指定默认值+限制必要性
let props = withDefaults(defineProps<{ list?: Persons }>(), {
  list: () => [{ id: 'asdasg01', name: '小猪佩奇', age: 18 }],
});
```

在这种写法中，除了接收 `list` 作为 `props` 并限制其类型外，我们还指定了一个默认值。并且通过 `?` 符号将 `list` 设置为可选。如果父组件没有传递 `list`，则会使用默认值。`withDefaults` 使得我们可以为 `props` 提供默认值。

### `Person.vue` 代码

```vue
<template>
  <div class="person">
    <ul>
      <li v-for="item in list" :key="item.id">
        {{ item.name }} -- {{ item.age }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { defineProps, withDefaults } from 'vue';
  import { type PersonInter } from '@/types';

  // 第三种写法：接收+限制类型+指定默认值+限制必要性
  let props = withDefaults(defineProps<{ list?: Persons }>(), {
    list: () => [{ id: 'asdasg01', name: '小猪佩奇', age: 18 }],
  });

  console.log(props);
</script>
```

在 `Person.vue` 中，我们定义了 `props` 并使用 `v-for` 指令循环渲染每个人的名字和年龄。

## 4. 总结

在 Vue 3 中使用 `props` 配合 TypeScript，可以提高代码的可读性和类型安全性。通过定义接口和类型，我们能够确保父子组件传递的数据符合预期格式。我们可以通过 `defineProps` 来接收 `props`，并通过类型定义、默认值和必要性限制来精确控制传入数据的格式。