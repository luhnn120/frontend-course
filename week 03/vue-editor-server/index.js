const express = require('express');
const multiparty = require('multiparty');

const { generateComponents } = require('./generateComponentsHandle.js')

const app = express()
// 监听端口
const PORT = 3000

// cross跨域
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};
app.use(allowCrossDomain);
// 生成后的静态资源
app.use(express.static('public'));

app.post('/generateComponents', (req, res) => {
  // 处理fromData,获取文件
  let form = new multiparty.Form();
  form.parse(req, function(err, fields, files){
    if(err) res.status(500).end(err);
    generateComponents(files.file[0])
      .then(result => {
      // 返回唯一标识
      res.end(result)
    })
    .catch(error => {
      res.status(500).end(error)
    })
  })
})

app.listen(PORT, () => {
  console.log(`server start`)
  console.log(`listening at http://localhost:${PORT}`)
})