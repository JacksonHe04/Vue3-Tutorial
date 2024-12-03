# `toRaw` 与 `markRaw` 的使用

在 Vue 3 的响应式系统中，`toRaw` 和 `markRaw` 是两种用于处理对象的 API。它们分别提供了获取原始对象和标记对象不参与响应式化的功能，适用于不同的场景。

## `toRaw`

### 作用
`toRaw` 用于获取响应式对象的原始对象。当你使用 `toRaw` 获取一个对象时，它返回的是未经过代理的原始对象，这个对象不会被 Vue 的响应式系统处理，因此不再触发视图更新。

- **用途**：常用于需要将响应式对象传递给非 Vue 库或外部系统时，确保它们接收到的是普通对象，而非响应式对象。

### 用法

```js
import { reactive, toRaw } from "vue";

// 创建响应式对象
let person = reactive({ name: 'tony', age: 18 });

// 获取原始对象
let rawPerson = toRaw(person);

console.log(rawPerson); // 输出的是普通对象，不会触发响应式更新
```

### 特点
- `toRaw` 返回的对象是原始对象，不再是响应式对象。
- 适用于在某些情况下需要避免响应式开销，或者将响应式对象传递给外部非 Vue 系统时。

### 注意
- **不建议将原始对象存储为持久引用**，因为它可能会与 Vue 的响应式系统脱离联系，从而导致更新的丧失。

## `markRaw`

### 作用
`markRaw` 用于标记一个对象，使其**永远不会变成响应式**。当你使用 `markRaw` 标记一个对象时，Vue 的响应式系统会忽略该对象，不会对其进行代理处理。

- **用途**：常用于你不希望某些对象成为响应式的场景。例如，使用 `mockjs` 时，如果你不想让生成的 mock 数据变成响应式对象，可以使用 `markRaw` 来避免 Vue 将它代理为响应式对象。

### 用法

```js
import { markRaw, reactive } from "vue";

// 使用 markRaw 标记对象
let citys = markRaw([
  { id: 'asdda01', name: '北京' },
  { id: 'asdda02', name: '上海' },
  { id: 'asdda03', name: '天津' },
  { id: 'asdda04', name: '重庆' }
]);

// 尝试将被 markRaw 标记的对象转为响应式对象
let citys2 = reactive(citys); // 会失败，因为 citys 被 markRaw 标记了

console.log(citys); // 输出原始对象
console.log(citys2); // 输出 null 或 undefined（表示无法创建响应式对象）
```

### 特点
- 被 `markRaw` 标记的对象不会成为响应式对象，Vue 会直接忽略它们。
- 适用于外部库的对象或你希望完全避免响应式化的场景。

## 总结

- **`toRaw`**：用于获取响应式对象的原始对象，避免触发代理和响应式开销。适用于将响应式对象传递给外部系统时使用。
- **`markRaw`**：标记对象为非响应式对象，确保该对象永远不会被 Vue 的响应式系统代理。适用于不希望某些对象参与响应式化的场景。

这两个 API 使得开发者能够更精细地控制 Vue 的响应式系统，避免不必要的性能开销，并提供更大的灵活性来处理外部对象和特殊数据结构。