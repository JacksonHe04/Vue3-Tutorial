# `readonly` 与 `shallowReadonly` 的使用

在 Vue 3 中，`readonly` 和 `shallowReadonly` 是两种创建只读响应式对象的 API。它们的区别在于对对象的嵌套属性的处理，`readonly` 会使对象的所有属性都变为只读，而 `shallowReadonly` 只会使对象的顶层属性变为只读。

## `readonly`

### 作用
`readonly` 用于创建一个对象的深只读副本。它会使对象及其所有嵌套的属性都变为只读，禁止对这些属性进行修改。

### 用法

```js
import { reactive, readonly } from 'vue';

const original = reactive({ nested: { key: 'value' }, other: 'data' });
const readOnlyCopy = readonly(original);
```

### 特点
- 对象的所有嵌套属性都将变为只读。
- 尝试修改任何属性时，会在开发模式下触发警告并阻止修改。
- 适用于创建不可变的状态或配置，确保数据不会被意外修改。

### 应用场景
- 创建不可变的状态快照。
- 保护全局状态或配置不被修改。

## `shallowReadonly`

### 作用
`shallowReadonly` 与 `readonly` 类似，但它只作用于对象的顶层属性，嵌套属性仍然是可修改的。这个 API 适用于只需保护对象顶层属性的场景。

### 用法

```js
import { reactive, shallowReadonly } from 'vue';

const original = reactive({ nested: { key: 'value' }, other: 'data' });
const shallowReadOnlyCopy = shallowReadonly(original);
```

### 特点
- 只将对象的顶层属性设置为只读。
- 对象内部的嵌套属性仍然是可变的。
- 可以用于只保护顶层属性不被修改，而不干涉深层次的修改。

### 应用场景
- 只需保护对象的顶层属性的场景，例如，保护配置对象的顶层键，但仍然允许修改深层数据。

## 总结

- **`readonly`**：创建一个深只读对象，禁止修改对象及其嵌套属性，适用于确保整个对象不被修改的情况。
- **`shallowReadonly`**：只将对象的顶层属性设为只读，嵌套属性仍然可修改，适用于只需要保护顶层数据的情况。

这两种 API 都是用来增加数据的不可变性，在应用开发中可以帮助开发者确保状态的完整性，减少意外修改数据的风险。