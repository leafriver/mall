# 为什么商品图片循环动态绑定时无法显示，而静态写法可以？

## 问题描述

在 Vue + Vite 项目中：

- 直接在模板里写：
  ```vue
  <img src="@/assets/images/p1.png" />
  ```
  图片可以正常显示。
- 但用循环动态绑定：
  ```vue
  <ProductCard :imgSrc="`@/assets/images/p${i}.png`" />
  ```
  图片却无法显示。

## 原因分析

### 1. 静态模板写法的原理

- 在 Vue 单文件组件（.vue）模板中，静态写法如 `<img src="@/assets/images/p1.png" />` 会被 Vite 编译阶段自动解析为真实的静态资源路径（如 `/src/assets/images/p1.png` 或打包后的 hash 路径）。
- 所以静态写法图片能正常显示。

### 2. 动态字符串绑定的局限

- 用 `:imgSrc="`@/assets/images/p${i}.png`"` 这种方式，`imgSrc` 只是一个普通字符串。
- 浏览器会直接请求 `/@/assets/images/p1.png`，而不是 Vite 处理过的真实路径。
- 由于没有经过 Vite 的静态资源处理，浏览器找不到该路径，导致图片加载失败（404）。

### 3. 正确的动态资源引用方式

- 推荐用 Vite 的 `new URL()` 方式：
  ```js
  const productImages = Array.from({ length: 20 }, (_, i) =>
    new URL(`../../assets/images/p${i + 1}.png`, import.meta.url).href
  );
  ```
- 这样 Vite 会在构建时自动处理路径，生成真实可用的图片链接。
- 在模板中循环渲染即可：
  ```vue
  <ProductCard
    v-for="(imgSrc, i) in productImages"
    :key="i"
    :imgSrc="imgSrc"
    :name="`商品${i + 1}`"
  />
  ```

## 总结

- **静态模板写法**：Vite 编译时自动处理 `@` 别名。
- **动态字符串绑定**：不会被 Vite 处理，浏览器直接请求，导致 404。
- **new URL + import.meta.url**：Vite 能识别并处理，适合动态生成静态资源路径。

---

参考：[Vite 官方文档：静态资源处理](https://cn.vitejs.dev/guide/assets.html) 