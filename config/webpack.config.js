const path = require('path')
const externalsDep = require('externals-dependencies')
const fs = require('fs')
// app root path
const appDirectory = fs.realpathSync(process.cwd())

module.exports = {
  mode: 'production',
  output: {
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  target: 'node',
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true,
    path: true,
  },
  externals: [externalsDep()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
}
