English | [简体中文](./README.zh-CN.md)

# React Error Catcher 🍑

This is a powerful **React** error catcher!

It can catch these below:
- React component render error, use [Error Bounary](https://zh-hans.reactjs.org/docs/error-boundaries.html)
- Event error, use [onError](https://developer.mozilla.org/zh-CN/docs/Web/API/ErrorEvent)
- Promise error, use [PromiseRejectionEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/PromiseRejectionEvent)

When error catched, you will get a list of errors by **onCatch** event

As we all konw, sometime errors can be too much to handle, so i filter the mutiple errors, also i support the **filters** for you to define which error can be ignored

## Props

|properity｜description｜type｜default｜
|:---|:---|:---|:---|
|errorRender|when an error occurs in component rendering, which to display|React.ReactNode|<h1>Something went wrong.</h1>|
|user|who cause the error|string|"unkonwn user"|
|app|error occurs in which app|string|"unkonwn app"|
|max|when the catched errors exceeds the max value, will trigger the callback method|number|1|
|delay|report error interval, unit is millisecond|number|60000|
|filters|define the errors which can be ignored|string[]|-|
|onCatch|callback when catching errors and achieving the trigger cases|(error: ErrorInfo[]) => any|-|

## About

If you want to develop a npm library, you can see [npm-template](https://github.com/Y-lonelY/npm-template), welecome to star and fork!







