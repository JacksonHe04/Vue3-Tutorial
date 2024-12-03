# Vue选项式API与组合式API的区别及组合式API的优势

Vue.js 在 Vue 2 中使用的是**选项式API**，而 Vue 3 引入了新的**组合式API**。两者在代码组织、灵活性和功能表现上存在显著差异。以下从语法、特性和实际使用场景的角度进行详细对比，并总结组合式API的优势。

---

## 选项式API（Vue 2）

选项式API通过组件的配置对象来定义组件逻辑，如 `data`、`methods`、`computed`、`watch` 等。

### 示例代码
```javascript
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
  mounted() {
    console.log('Component mounted!');
  },
};
```

### 特点
1. **分区管理逻辑**：组件逻辑基于选项（如 `data`、`methods`）分散在不同的配置块中。
2. **清晰的组织结构**：适合简单组件，逻辑职责分离明确。
3. **可读性降低（复杂组件）**：对于复杂组件，单个功能逻辑被拆分成多个部分，代码难以维护和理解。

---

## 组合式API（Vue 3）

组合式API通过引入 `setup` 函数，将逻辑组织在一个统一的作用域中，使用 Vue 的响应式特性（如 `ref` 和 `reactive`）来实现状态和行为。

### 示例代码
```javascript
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const count = ref(0);

    const increment = () => {
      count.value++;
    };

    onMounted(() => {
      console.log('Component mounted!');
    });

    return {
      count,
      increment,
    };
  },
};
```

### 特点
1. **集中管理逻辑**：与特定功能相关的逻辑可以集中在一起。
2. **高灵活性**：便于逻辑复用，通过自定义的组合函数（Composition Functions）实现跨组件共享逻辑。
3. **类型推导更友好**：配合 TypeScript，组合式API的类型推断更加直观和强大。

---

## 选项式API与组合式API的主要区别

| 特性                | 选项式API                            | 组合式API                            |
|---------------------|--------------------------------------|--------------------------------------|
| **逻辑组织**         | 按功能分散到 `data`、`methods` 等     | 在 `setup` 中按逻辑功能集中管理       |
| **代码复用**         | 使用混入（Mixins），但可能导致冲突     | 通过组合函数，模块化且无冲突          |
| **类型支持**         | 类型推导不直观                      | 更适合与 TypeScript 集成              |
| **复杂度管理**       | 随组件复杂性增加可读性降低            | 能够更好地组织复杂逻辑                |
| **性能**            | 响应式基于 `Object.defineProperty`    | 响应式基于 Proxy，性能提升明显         |

---

## 组合式API的优势

### 1. **更好的逻辑复用**
- 通过组合函数（`Composition Functions`）抽取逻辑，不再依赖于 `Mixins`。
- 解决了混入逻辑命名冲突的问题。

### 示例
```javascript
// 一个通用的计数器逻辑
import { ref } from 'vue';

export function useCounter() {
  const count = ref(0);
  const increment = () => count.value++;
  const decrement = () => count.value--;

  return { count, increment, decrement };
}

// 在组件中复用
import { useCounter } from './useCounter';

export default {
  setup() {
    const { count, increment, decrement } = useCounter();
    return { count, increment, decrement };
  },
};
```

### 2. **更好的逻辑聚合**
- 可以将相关逻辑（如状态、方法、生命周期钩子等）集中在一起，代码更加清晰。

### 示例
```javascript
import { ref, watch, onMounted } from 'vue';

export default {
  setup() {
    const count = ref(0);

    // Watcher
    watch(count, (newVal, oldVal) => {
      console.log(`Count changed from ${oldVal} to ${newVal}`);
    });

    // Lifecycle
    onMounted(() => {
      console.log('Mounted with count:', count.value);
    });

    return { count };
  },
};
```

### 3. **性能提升**
- Vue 3 使用 Proxy 实现响应式系统，相比 Vue 2 的 `Object.defineProperty` 性能更优。
- 组合式API原生支持 tree-shaking，可减小打包体积。

### 4. **类型推导与IDE支持更强**
- 利用 TypeScript，变量和函数的类型推导更加友好，代码在 IDE 中获得更好的提示和校验支持。

### 5. **更强的扩展能力**
- 可以更方便地构建基于 Vue 的插件或功能模块。
- 比如使用 Vue3 的 `provide/inject` 实现跨层级组件的逻辑共享。

---

## 总结

选项式API适合初学者和简单组件，结构直观清晰；而组合式API提供了更灵活的逻辑组织方式和更强的扩展性，适合复杂组件和大型项目。在 Vue 3 中，组合式API更体现了框架设计的现代化，建议在新项目中优先使用。