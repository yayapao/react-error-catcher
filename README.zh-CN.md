简体中文 | [English](./README.md)

# React Error Catcher 🍑

这是一个强大 React 错误捕获组件！

它可以捕获如下错误:
- React 组件渲染错误, 利用 [Error Bounary](https://zh-hans.reactjs.org/docs/error-boundaries.html)
- 事件错误，利用 [onError](https://developer.mozilla.org/zh-CN/docs/Web/API/ErrorEvent)
- 异步处理错误, 利用 [PromiseRejectionEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/PromiseRejectionEvent)

当捕获到错误时，并且没有被过滤掉，会在 **onCatch** 内返回一个错误列表

众所周知，有时会触发太多重复的错误，因此我做了一部分工作用来过滤重复的相同错误，同时也支持通过 `filters` 属性来配置你需要过滤的错误


## Props

|属性｜描述｜类型｜默认值｜
|:---|:---|:---|:---|
|errorRender|当捕获到组件渲染错误时，降级渲染样式|React.ReactNode|<h1>Something went wrong.</h1>|
|user|谁触发了错误|"unkonwn user"|
|app|触发错误的 app|string|"unkonwn app"|
|max|当捕获到的错误超过设置 max 值时，触发 `onCatch` 事件|number|1|
|delay|设置错误上报周期|number|60000|
|filters|定义需要过滤的错误|string[]|-|
|onCatch|当满足设置条件时的错误捕获回调|(error: ErrorInfo[]) => any|-|

## About

如果你也想发布一个 npm 库, 你可以看看 [npm-template](https://github.com/Y-lonelY/npm-template), 欢迎 star 和 fork!
