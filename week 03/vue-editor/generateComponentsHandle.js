const fs = require('fs');
const {build} = require('./vue-reload/build')

function generateComponents(file){
  return new Promise(resolve => {
    fs.copyFile(file.path, './vue-reload/app.vue', err => {
      if(err) throw err;
      build()
      .then(() => {
        return findComponent()
      })
      .then(res => {
        if(res){
          resolve(res)
        } else {
          throw new Error('build error')
        }
      })
      .catch(error => {
        throw error;
      })
    })
  })
}

async function findComponent() {
  const dir = await fs.promises.opendir('./public/dist');
  for await (const dirent of dir) {
    const regx = /^component/;
    if(regx.test(dirent.name)){
      const chunkHash = dirent.name.replace(/component\.(.*?).js/g, (match, p0) => {
        return p0
      })
      return chunkHash
    }
  }
}
module.exports = {
  generateComponents,
}