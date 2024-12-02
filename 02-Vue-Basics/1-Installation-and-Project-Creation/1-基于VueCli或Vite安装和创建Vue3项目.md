# 安装和创建 Vue3 项目

## 基于 Vue CLI 创建

点击查看[官方文档](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)。

> 备注：`vue-cli` 已处于维护模式，官方推荐基于 `Vite` 创建项目。

```powershell
# 查看 @vue/cli 版本，确保版本在 4.5.0 以上
vue --version

# 安装或者升级你的 @vue/cli
npm install -g @vue/cli

# 执行创建命令
vue create vue_test

# 随后选择 3.x
# Choose a version of Vue.js that you want to start the project with (Use arrow keys)
# > 3.x
#   2.x

# 启动项目
cd vue_test
npm run serve
```

---

## 基于 Vite 创建（推荐）

`Vite` 是新一代前端构建工具，官网地址：[https://vitejs.cn](https://vitejs.cn/)。`Vite` 的主要优势如下：

- **极速热重载**（HMR），实现快速的服务启动。
- 开箱即用支持 `TypeScript`、`JSX`、`CSS` 等。
- 真正的按需编译，无需等待整个应用完成编译。
- 构建性能与 `webpack` 对比显著优化。

点击查看[官方文档](https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application)。

### 创建项目的具体步骤

```powershell
# 1. 创建命令
npm create vue@latest

# 2. 配置项目
√ Project name: vue3_test          # 配置项目名称
√ Add TypeScript?  Yes            # 是否添加 TypeScript 支持
√ Add JSX Support?  No            # 是否添加 JSX 支持
√ Add Vue Router?  No             # 是否添加 Vue Router
√ Add Pinia?  No                  # 是否添加 Pinia 状态管理
√ Add Vitest?  No                 # 是否添加单元测试支持
√ Add an End-to-End Testing Solution?  No  # 是否添加端到端测试
√ Add ESLint?  Yes                # 是否添加 ESLint 语法检查
√ Add Prettier?  No               # 是否添加 Prettier 格式化工具
```

---

## 自定义 App 组件

以下为一个简单的 `App` 组件示例：

```vue
<template>
  <div class="app">
    <h1>你好啊！</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App', // 组件名
};
</script>

<style>
.app {
  background-color: #ddd;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>
```

---

## 总结

- **入口文件**：在 `Vite` 项目中，`index.html` 是项目的入口文件，位于项目根目录。
- **解析流程**：加载 `index.html` 后，`Vite` 会解析 `<script type="module" src="xxx">` 指向的 `JavaScript` 文件。
- **应用实例**：在 `Vue3` 中，通过 `createApp` 函数创建一个应用实例。

更多细节请参考官方文档或示例代码。