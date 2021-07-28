const webpack = require('webpack')
const webpackConfig = require('./config.js')
const { VueLoaderPlugin } = require('vue-loader')

let compiler = webpack(webpackConfig);

new VueLoaderPlugin().apply(compiler);

// 通过vue-reload将vue文件解析为vue component
function build (){
  return new Promise(resolve => {
    compiler.run(function (err, stats) {
      if(err){
        throw err
      }
      if(stats.hasErrors()) {
        throw new Error(stats.toString())
      }
      resolve();
    });
  })
}

module.exports = {
  build
}