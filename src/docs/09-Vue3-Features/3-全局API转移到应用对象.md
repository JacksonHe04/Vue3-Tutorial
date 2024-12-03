# 【全局 API 转移到应用对象】

在 Vue 3 中，许多原本挂载在 Vue 根实例上的全局 API 被转移到了应用实例对象上。应用实例对象是通过 `createApp()` 方法创建的，并且它封装了 Vue 应用的全局配置和全局方法。在 Vue 3 中，应用实例对象提供了更多的控制和灵活性，方便我们在更高层级管理应用。

以下是 Vue 3 中一些常用的全局 API 和它们如何转移到应用实例对象的详细介绍：

## 1. `app.component`

### 作用

`app.component` 用于全局注册组件。通过该 API，我们可以在整个应用中注册全局组件，使其可以在任何地方使用。

### 用法

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import MyComponent from './components/MyComponent.vue';

const app = createApp(App);

// 注册全局组件
app.component('MyComponent', MyComponent);

app.mount('#app');
```

### 说明

- `app.component` 接受两个参数，第一个是组件名（通常是 PascalCase），第二个是组件的定义（可以是一个组件对象、组件构造函数等）。
- 注册后的组件可以在整个应用的模板中使用，无需再次导入。

## 2. `app.config`

### 作用

`app.config` 用于配置应用的一些全局选项，如 `globalProperties` 和 `devtools` 等。

### 用法

```javascript
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 配置全局属性
app.config.globalProperties.$myGlobalProperty = 'Global Property';

app.mount('#app');
```

### 说明

- `app.config` 是一个包含应用配置选项的对象。
- `globalProperties` 可以让你设置全局可访问的属性，在应用中的任何组件内都可以通过 `this.$myGlobalProperty` 来访问。

## 3. `app.directive`

### 作用

`app.directive` 用于注册全局自定义指令。

### 用法

```javascript
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 注册全局自定义指令
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});

app.mount('#app');
```

### 说明

- `app.directive` 接受两个参数，第一个是指令名称，第二个是指令对象。你可以定义 `mounted`、`updated` 等生命周期钩子。
- 注册后的自定义指令可以在应用中的任何组件模板中使用。

## 4. `app.mount`

### 作用

`app.mount` 用于将应用挂载到指定的 DOM 元素上。它是应用的启动方法。

### 用法

```javascript
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 挂载应用
app.mount('#app');
```

### 说明

- `app.mount` 接受一个 DOM 选择器或实际 DOM 元素，用于指定应用挂载的容器。
- 应用挂载后，整个应用将由 Vue 管理，所有的组件和模板都会被渲染到指定的 DOM 元素中。

## 5. `app.unmount`

### 作用

`app.unmount` 用于卸载应用。这通常用于动态卸载某个 Vue 应用，释放资源。

### 用法

```javascript
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 挂载应用
app.mount('#app');

// 在某个时刻卸载应用
app.unmount('#app');
```

### 说明

- `app.unmount` 可以在任何时候调用，用于卸载 Vue 应用。
- 一旦调用 `unmount`，Vue 会停止管理该容器内的所有组件，组件的生命周期钩子也会被触发。

## 6. `app.use`

### 作用

`app.use` 用于插件的安装。通过这个方法，可以向应用添加插件或功能扩展。

### 用法

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import SomePlugin from './plugins/SomePlugin';

const app = createApp(App);

// 使用插件
app.use(SomePlugin);

app.mount('#app');
```

### 说明

- `app.use` 可以接收一个插件，插件必须暴露一个 `install` 方法。
- 插件可以向应用提供额外的功能，例如全局组件、指令、配置选项等。

## 总结

在 Vue 3 中，所有的全局 API 都已转移到应用实例对象上。这样做的好处是：

- 更加清晰和灵活的 API 设计。
- 使得应用的配置、插件使用和全局资源管理都集中在应用实例对象上。
- 提高了代码的可维护性，避免了全局变量或方法的冲突。

通过使用 `createApp()` 创建应用实例并调用相应的 API，可以方便地管理 Vue 应用的生命周期、配置、插件等。