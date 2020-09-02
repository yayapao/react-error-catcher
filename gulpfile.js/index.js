/* eslint-disable no-undef */
const { series, src, dest } = require('gulp')
const clean = require('gulp-clean')
// const uglify = require('gulp-uglify')
const webpack = require('webpack-stream')

async function cleanDist() {
  src('dist/', { read: false, allowEmpty: true }).pipe(clean())
}

async function build() {
  //   src('src/index.js')
  src('src/components/ErrorCatcher/index.tsx')
    .pipe(webpack(require('../config/webpack.config')))
    // .pipe(uglify())
    .pipe(dest('dist'))
}
exports.default = series(cleanDist, build)
