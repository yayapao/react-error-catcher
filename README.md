English | [简体中文](./README.zh-CN.md)

# FE-TEMPLATE

This is a fe-template **React** project based on [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) and [antd](https://ant.design/docs/react/introduce-cn)

## Attention Point

1. In `.prettierrc` set `{ "endOfLine": "auto" }` to solve **Delete \`cr\` eslint(prettier/prettier)**

2. `config-overrides.js` use to override config of create react app，you can see to learn more on [react-app-rewired](https://github.com/timarney/react-app-rewired/)

3. you need to config `src/typing.d.ts` to declare global moduels, which will be compile by ts



### About override the webpack config 

In fact, I have tried many ways to do this job, emmm, someone looks can not do the job perfectly!

Then, why not [Craco](https://github.com/gsoft-inc/craco)?

It do the less-loader to config the theme looks good, but when config the webpack about `alias`, everything becomes terrible, you can see [this issue](https://github.com/risenforces/craco-alias/issues/1) for more messages!

Fine, then i use [react-app-rewired](https://github.com/timarney/react-app-rewired) to overide the config, but it support the version of CRA below 2.0, so you should to add [customize-cra](https://github.com/arackaf/customize-cra) to support the CRA 2.0

You can search [customize-cra-apis](https://github.com/arackaf/customize-cra/blob/master/api.md) to get what you need 🙉.

In this **Template**, we use these below:
- `yarn add less less-loader --dev` to support less file
- `yarn add react-hot-loader` and `yarn add react-app-rewire-hot-loader --dev` to support the react-hot-loader, you can see (react-app-rewire-hot-loader)[https://github.com/cdharris/react-app-rewire-hot-loader] and (issues)[https://github.com/arackaf/customize-cra/issues/54] for some details

Config `alisa` is more complicated, you need to create `paths.json` and config `config-overrides.js` and `tsconfig.json` to make it work!

The key point is to config `{"extends": "./paths.json"}`, when compling, the compiler will remove the `paths`, so you need to use `extends` param to inherit from, you can see [extends](https://www.typescriptlang.org/tsconfig#extends) for details!





