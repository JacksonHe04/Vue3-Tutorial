# Vue 3 中标签的 `ref` 属性

## 作用：用于注册模板引用

在 Vue 3 中，`ref` 是一个非常有用的功能，允许你在模板中标记某个元素或组件实例，从而可以在 JavaScript 代码中访问它。`ref` 主要有两种应用场景：一种是用于普通 `DOM` 标签，另一种是用于组件标签。

### 用在普通 `DOM` 标签上

当 `ref` 用在普通的 `DOM` 元素上时，它的作用是获取该 `DOM` 元素的引用。这样，你可以直接访问并操作该元素，例如修改其内容、样式或执行其他操作。

#### 示例代码：

```vue
<template>
  <div class="person">
    <h1 ref="title1">尚硅谷</h1>
    <h2 ref="title2">前端</h2>
    <h3 ref="title3">Vue</h3>
    <input type="text" ref="inpt"> <br><br>
    <button @click="showLog">点我打印内容</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { ref } from 'vue'
  
  let title1 = ref()
  let title2 = ref()
  let title3 = ref()

  function showLog(){
    // 通过id获取元素
    const t1 = document.getElementById('title1')
    // 打印内容
    console.log((t1 as HTMLElement).innerText)
    console.log((<HTMLElement>t1).innerText)
    console.log(t1?.innerText)
    
    /************************************/
    
    // 通过ref获取元素
    console.log(title1.value)
    console.log(title2.value)
    console.log(title3.value)
  }
</script>
```

#### 解释：

- 在 `template` 部分，使用 `ref` 将 `h1`、`h2`、`h3` 和 `input` 元素分别标记为 `title1`、`title2`、`title3` 和 `inpt`。
- 在 `script` 部分，使用 `ref()` 定义了这些元素的引用，并通过 `title1.value` 访问相应的 `DOM` 元素。
- 在点击按钮时，调用 `showLog` 方法，通过 `ref` 和 `document.getElementById()` 获取元素并打印它们的内容。

### 用在组件标签上

`ref` 也可以用在子组件标签上，它的作用是获取该子组件的实例。这使得父组件可以访问子组件的内部数据或方法。

#### 示例代码：

```vue
<!-- 父组件App.vue -->
<template>
  <Person ref="ren"/>
  <button @click="test">测试</button>
</template>

<script lang="ts" setup name="App">
  import Person from './components/Person.vue'
  import { ref } from 'vue'

  let ren = ref()

  function test(){
    console.log(ren.value.name)
    console.log(ren.value.age)
  }
</script>


<!-- 子组件Person.vue中要使用defineExpose暴露内容 -->
<script lang="ts" setup name="Person">
  import { ref, defineExpose } from 'vue'
  // 数据
  let name = ref('张三')
  let age = ref(18)
  /****************************/
  /****************************/
  // 使用defineExpose将组件中的数据交给外部
  defineExpose({ name, age })
</script>
```

#### 解释：

- 在父组件 `App.vue` 中，通过 `ref="ren"` 获取子组件 `Person` 的实例，并通过 `ren.value` 访问子组件的数据。
- 在子组件 `Person.vue` 中，通过 `defineExpose()` 将组件中的数据（如 `name` 和 `age`）暴露给外部，这样父组件就可以访问这些数据。

### 总结

- `ref` 用于在 Vue 模板中注册引用，可以帮助你直接访问 `DOM` 元素或组件实例。
- 在普通 `DOM` 标签中，`ref` 使你能够操作该元素。
- 在组件标签中，`ref` 允许父组件访问子组件的实例和数据，这对于组件间的交互非常有用。