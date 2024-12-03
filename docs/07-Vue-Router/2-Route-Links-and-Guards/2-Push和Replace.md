# 网页浏览中的 `push` 和 `replace`

在网页的浏览历史管理中，`push` 和 `replace` 都是用于操作浏览器的历史记录栈（History Stack）的方法。它们的作用类似，但在处理历史记录时有所不同。

## 1. `pushState` 和 `replaceState`（浏览器原生 API）

- **`pushState`**:
    - `pushState` 会向浏览器的历史记录中添加一个新的记录。
    - 这意味着点击浏览器的“后退”按钮时，用户可以回到上一个状态。
    - 示例：你点击一个链接后，浏览器 URL 发生变化，但当前页面不重新加载，历史记录会被更新。

  ```js
  history.pushState(state, title, url);
  ```

- **`replaceState`**:
    - `replaceState` 会修改当前的历史记录，而不会创建新的记录。
    - 用户点击“后退”按钮时，不会返回到这个修改过的状态，而是会直接跳到修改前的状态。
    - 适用于替换当前的 URL，而不希望用户能后退回去。

  ```js
  history.replaceState(state, title, url);
  ```

## 2. `router-link` 中的 `replace`

在前端框架中（如 Vue.js 和 React Router），通常会使用类似 `router-link` 或 `Link` 组件来进行路由跳转。

- **`router-link` 默认行为（`push`）**：
    - 默认情况下，`<router-link>` 会执行类似 `pushState` 的操作，即向历史记录栈中添加一个新的条目。
    - 例如，如果你点击某个链接，浏览器的历史记录会新增一条记录，用户可以通过点击浏览器的“后退”按钮返回到上一个页面。

  ```html
  <router-link to="/new-page">Go to New Page</router-link>
  ```

- **`replace` 选项**：
    - 当你在 `router-link` 上使用 `replace` 属性时，Vue Router 会调用类似 `replaceState` 的操作，替换当前历史记录中的条目，而不是添加新的条目。
    - 用户点击“后退”按钮时，不会回到这个跳转前的页面，而是直接跳过这个跳转，回到更早的页面。

  ```html
  <router-link to="/new-page" replace>Go to New Page</router-link>
  ```

## 它们的应用场景

### 1. `push`（创建新的历史记录）

`push` 通常用于用户希望能够后退到当前页面的情况。典型的应用场景包括：

- **常规页面导航**：例如点击一个链接从一个页面跳转到另一个页面时，默认是使用 `push`，这样用户可以使用浏览器的“后退”按钮返回上一个页面。
- **分页系统**：在多页内容中，每次加载新的一页时，都需要将新的 URL 添加到历史记录中，以便用户能够后退到前一页。

### 2. `replace`（替换当前历史记录）

`replace` 则用于那些你希望用户无法回退的情况，或者页面跳转时不需要增加历史记录的场景。典型的应用场景包括：

- **表单提交后跳转**：如果用户提交了一个表单并跳转到另一个页面，你可能希望用户无法通过点击“后退”按钮返回到表单页面。使用 `replace` 让提交后的页面替代表单页面，防止用户回到表单页面。

  例如：
  ```html
  <router-link to="/submit-success" replace>Submit</router-link>
  ```

- **重定向操作**：当你希望用户在访问某些页面时自动跳转（如登录验证后跳转到主页），而不想让用户通过浏览器的“后退”按钮返回到之前的页面。

  例如：
  ```js
  this.$router.replace('/home');
  ```

## 总结

- **`push`**: 会向历史记录中添加一条新记录，允许用户通过浏览器的“后退”按钮返回。
- **`replace`**: 会替换当前的历史记录，用户无法通过“后退”按钮返回到修改前的页面。

在 Vue Router 中，如果你想避免用户回到某个页面（比如跳转后不想让用户再返回登录页面），可以使用 `replace` 属性或 `replace` 方法。