const fs = require('fs');
const {build} = require('./vue-reload/build')

function generateComponents(file){
  return new Promise((resolve, reject) => {
    fs.copyFile(file.path, './vue-reload/app.vue', err => {
      if (err) throw err;
      // 执行构建
      build()
      .then((uuid) => {
        resolve(uuid)
      })
      .catch(error => {
        reject(error);
      })
    })
  })
}

module.exports = {
  generateComponents,
}