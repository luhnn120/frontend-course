const express = require('express');
const multiparty = require('multiparty');

const { generateComponents } = require('./generateComponentsHandle.js')

const app = express()
const port = 3000
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};
app.use(allowCrossDomain);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/generateComponents',(req, res) => {
  let form = new multiparty.Form();
  form.parse(req, function(err, fields, files){
    if(err) res.status(500).end(err);
    generateComponents(files.file[0])
    .then(result => {
      res.end(result)
    })
    .catch(error => {
      res.status(500).end(error)
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})