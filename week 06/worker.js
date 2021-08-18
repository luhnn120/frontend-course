var http = require('http');

var server = http.createServer(function (req, res) { 
  setTimeout(() => {
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    res.end('handled by child, pid is ' + process.pid + '\n');
  }, 5000)
});

var worker;
process.on('message', function (m, tcp) { 
  if (m === 'server') {
    worker = tcp;
    worker.on('connection', function (socket) { 
      server.emit('connection', socket); 
  }); 
  } 
});

process.on('uncaughtException', function () {
  // 发送自杀信号，断开链接，退出进程
  process.send({act: 'suicide'})
  worker.close(function () {
    process.exit(1)
  })
})