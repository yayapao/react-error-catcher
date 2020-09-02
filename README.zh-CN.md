简体中文 | [English](./README.md)

# FE-TEMPLATE

FE-TEMPLATE 是一个基于 [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) 和 [antd](https://ant.design/docs/react/introduce-cn) 的 React 项目

## 注意点

1. 在 `.prettierrc` 设置 `{ "endOfLine": "auto" }` 来解决 **Delete \`cr\` eslint(prettier/prettier)**

2. `config-overrides.js` 被用来重写 create react app 的相关配置，该项目没有使用 `npm run eject` 来暴露配置，你可以参考 [react-app-rewired](https://github.com/timarney/react-app-rewired/) 来了解更多信息

3. 你需要配置 `src/typing.d.ts` 来声明全局模块，它会被 typescript 编译器识别

### 重写 webpack 配置

事实上，对于在不使用 `npm run eject` 的前提下，我尝试了一些方法来达到牡蛎，但是并不是所有的开源方案都能够运行良好

所以，为什么不是 [Craco](https://github.com/gsoft-inc/craco)?

它能够覆盖 `less-loader` 的主题配置等需求，但是当我想配置别名时，它并不能够很好地执行，你可以参考 [this issue](https://github.com/risenforces/craco-alias/issues/1) 获取更多信息！

之后，我用 [react-app-rewired](https://github.com/timarney/react-app-rewired) 来覆盖配置，但是它对于 CRA 2.0 以下的版本支持比较好，所以我们需要使用 [customize-cra](https://github.com/arackaf/customize-cra) 来支持更高版本的 CRA

你可以在 [customize-cra-apis](https://github.com/arackaf/customize-cra/blob/master/api.md) 内查找你需要的解决方案

在这个项目内，我使用了以下这些：
- `yarn add less less-loader --dev` 来解决 less 文件
- `yarn add react-hot-loader` 和 `yarn add react-app-rewire-hot-loader --dev` 来支持 react-hot-loader, 你可以参考 (react-app-rewire-hot-loader)[https://github.com/cdharris/react-app-rewire-hot-loader] 和 (issues)[https://github.com/arackaf/customize-cra/issues/54] 了解更多细节

配置 `alias` 显得更加复杂，你需要创建 `paths.json` 同时配置 `config-overrides.js` 和 `tsconfig.json` 来使其生效

其关键点在于配置 `{"extends": "./paths.json"}`，当编译时，编译器会清楚 `paths` 的配置，你需要使用 `extends` 参数来使其进行继承，你可以参考 [extends](https://www.typescriptlang.org/tsconfig#extends) 来获取更多细节！
