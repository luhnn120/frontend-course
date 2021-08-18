# Master/Worker 主从网络处理架构实现
## 作业
```node master.js```
1. 启动项目, 主进程监听8081端口，同时根据cpu的核数创建子进程。
2. 主进程接受请求后分发，给子进程处理
3. 手动关闭子进程后，主进程重启子进程
4. 子进程异常关闭时，向主进程发送自杀信号，主进程重启子进程
5. 限制子进程重启次数和时间，超过后不再重启