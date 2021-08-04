const webpack = require('webpack')
const { creatConfig } = require('./config.js')
const { VueLoaderPlugin } = require('vue-loader')
// 通过uuid作为唯一标识, 最好应该保存到文件服务，以fileId作为标识
const { v4 } = require('uuid');
// 通过vue-reload将vue文件解析为vue component
function build (){
  return new Promise((resolve, reject) => {
    const uuid = v4()
    let compiler = webpack(creatConfig(uuid));
    new VueLoaderPlugin().apply(compiler);
    compiler.run(function (err, stats) {
      if(err){
        reject(err) 
      }
      if(stats.hasErrors()) {
        reject(stats.toString())
      }
      resolve(uuid);
    });
  })
}

module.exports = {
  build
}