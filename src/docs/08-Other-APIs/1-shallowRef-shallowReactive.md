# Vue 3 中的 `shallowRef` 与 `shallowReactive`

在 Vue 3 的响应式系统中，`shallowRef` 和 `shallowReactive` 是两种常用的创建浅层响应式数据的方法，它们的作用是让数据的顶层属性变得响应式，但不会追踪嵌套对象内部的变化。这种浅层响应式的设计可以避免不必要的性能开销，特别是在处理深层嵌套对象时。

## `shallowRef`

### 作用
`shallowRef` 用于创建一个响应式数据，但仅对数据的顶层引用进行响应式处理。也就是说，如果这个响应式变量指向一个对象或数组，只有这个对象/数组本身的引用变化会被追踪，而对象/数组内部的值的变化不会成为响应式。

### 用法

```js
import { shallowRef } from 'vue';

let myVar = shallowRef(initialValue);
```

- `initialValue` 是初始化的值，`myVar` 现在是一个响应式对象，只有顶层的引用变化会触发视图更新。

### 特点
- 只会跟踪引用的变化。
- 如果 `myVar` 是一个对象或数组，修改对象内部的属性不会触发更新。
- 用于避免深度响应式所带来的性能开销。

## `shallowReactive`

### 作用
`shallowReactive` 用于创建一个浅层响应式对象，只会让对象的最顶层属性变成响应式的。对象内部的嵌套属性不会变成响应式，这与 `shallowRef` 类似，但是 `shallowReactive` 适用于整个对象，而不仅仅是引用值。

### 用法

```js
import { shallowReactive } from 'vue';

const myObj = shallowReactive({ key1: 'value1', key2: { nestedKey: 'nestedValue' } });
```

- `myObj` 是一个响应式对象，`key1` 会变成响应式，但 `key2` 内部的 `nestedKey` 不会变成响应式。

### 特点
- 对象的顶层属性会变成响应式，但嵌套对象的属性不会。
- 适用于你不需要追踪深层属性变化的场景。

## 总结

`shallowRef` 和 `shallowReactive` 都是 Vue 3 响应式系统中的浅层响应式 API。它们通过仅追踪顶层属性的变化，而避免了对嵌套对象每一层都进行响应式处理，从而有效提升性能。选择使用哪一个取决于你的需求：

- **`shallowRef`**：适用于引用类型的响应式，特别是对于对象、数组等结构的引用变化。
- **`shallowReactive`**：适用于整个对象的浅层响应式，但不追踪嵌套对象的属性变化。

通过这些 API，开发者可以在需要时更灵活地控制响应式的深度，从而优化性能。