const forks = require("child_process").fork
const cpus = require("os").cpus()
// master server
const server = require("net").createServer()
server.listen(8081)

const workers = {};

// 重启次数
const LIMIT_COUNT = 10
// 时间限制
const DURING = 60000
const restart = []
let limitLength;
function isTooFrequently() {
  // 记录重启时间
  const time = Date.now()
  const limitLength = restart.push(time)
  if (limitLength > LIMIT_COUNT) {
    restart = restart.slice(LIMIT_COUNT * -1)
  }
  // 限制次数内的重启用时与重启次数
  return restart.length >= LIMIT_COUNT && restart[restart.length - 1] - restart[0] < DURING
}

function createWorker() {
  // 重启检测
  if (isTooFrequently()) {
    process.emit('giveup', limitLength, DURING)
    return;
  }
  const worker = forks('./worker.js');
  // 接受异常信号，重启进程
  worker.on('message', function (message) {
    if (message.act === 'suicide') {
      createWorker();
    }
  })
  // 进程退出时重启进程
  worker.on('exit', function () {
    console.log(`Worker: ${worker.pid} exited`)
    delete workers[worker.pid]
    createWorker();
  })

  // 句柄转发
  worker.send('server', server)
  worker[worker.pid] = worker
  console.log(`Create worker. pid: ${worker.pid}`)
}

for (let i = 0; i < cpus.length; i++) {
  createWorker()
}

process.on('exit', function () {
  for (let pid in workers) {
    workers[pid].kill();
  }
})