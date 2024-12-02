# Vue 实例：`new Vue()` 和组件实例的创建

本文档将介绍 Vue 2 中的 `new Vue()` 方法及 Vue 组件实例的创建过程，并结合 Vue 3 + Vite 项目结构说明这些步骤一般出现的具体位置。

---

## Vue 实例：`new Vue()`

### **定义**
`new Vue()` 是 Vue 2 中创建根实例的方法。根实例是 Vue 应用的入口，用于挂载整个应用并管理全局状态。

### **语法**
```javascript
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    greet() {
      alert(this.message);
    }
  },
  render: h => h(App) // 渲染根组件
});
```

### **主要参数**
- **`el`**：挂载点，用于指定 DOM 节点（选择器形式）。
- **`data`**：用于定义根实例的响应式数据。
- **`methods`**：定义可被绑定到事件的函数。
- **`render`**：渲染函数，通常用来渲染根组件。
- **生命周期钩子**：如 `created`、`mounted` 等，用于在不同阶段执行代码。

---

## Vue 组件实例的创建

### **定义**
每个 Vue 组件也是一个 Vue 实例，用于管理自身的模板、数据和逻辑。

### **创建组件的方式**
1. **全局注册组件**
   ```javascript
   Vue.component('my-component', {
     template: '<div>{{ message }}</div>',
     data() {
       return {
         message: 'This is a component!'
       };
     }
   });
   ```
   这种方式将组件注册为全局可用。

2. **局部注册组件**
   ```javascript
   export default {
     components: {
       MyComponent
     },
     template: '<MyComponent />'
   };
   ```

3. **单文件组件 (SFC)**  
   使用 `.vue` 文件开发组件：
   ```vue
   <template>
     <div>{{ message }}</div>
   </template>

   <script>
   export default {
     data() {
       return {
         message: 'This is a component!'
       };
     }
   };
   </script>
   ```

---

## 在 Vue 3 + Vite 项目中的实践

### **项目中的位置**
在 Vue 3 中，`new Vue()` 被 `createApp()` 取代。以下是相关的使用场景及位置：

1. **根实例创建**
   在 `src/main.js` 或 `src/main.ts` 文件中：
   ```javascript
   import { createApp } from 'vue';
   import App from './App.vue';

   const app = createApp(App); // 创建 Vue 应用实例
   app.mount('#app'); // 挂载到指定 DOM 节点
   ```
    - **`createApp`** 替代了 Vue 2 的 `new Vue()`，更适合模块化和扩展。

2. **组件注册和调用**
    - 组件一般定义在 `src/components` 文件夹中。
    - 示例组件 `HelloWorld.vue` 文件路径：`src/components/HelloWorld.vue`。
      ```vue
      <template>
        <h1>{{ greeting }}</h1>
      </template>
 
      <script>
      export default {
        data() {
          return {
            greeting: 'Welcome to Vue 3!'
          };
        }
      };
      </script>
      ```
    - 在 `App.vue` 或其他页面中使用：
      ```vue
      <template>
        <HelloWorld />
      </template>
 
      <script>
      import HelloWorld from './components/HelloWorld.vue';
 
      export default {
        components: { HelloWorld }
      };
      </script>
      ```

3. **模块化设计**
   在 Vite 项目中，组件实例化及根实例初始化分工明确：
    - **组件开发**：`src/components` 下开发并导出组件。
    - **根实例初始化**：`src/main.js`/`src/main.ts` 文件中挂载 Vue 应用并引入全局组件或插件。

---

## 总结

- **Vue 2**：`new Vue()` 用于创建根实例，并提供全局状态、生命周期钩子和渲染功能。
- **Vue 3**：`createApp()` 是新的实例创建方法，与 Vite 配合使用更模块化。
- **Vite 项目结构**：
    - 根实例配置在 `src/main.js` 中。
    - 组件开发在 `src/components` 文件夹中。
    - 根组件通常是 `src/App.vue`，通过 `main.js` 挂载到 DOM 节点。