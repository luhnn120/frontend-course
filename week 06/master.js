const cp = require("child_process")

const child1 = cp.fork("./worker.js")
const child2 = cp.fork("./worker.js")
const child3 = cp.fork("./worker.js")
const child4 = cp.fork("./worker.js")
const child5 = cp.fork("./worker.js")
const child6 = cp.fork("./worker.js")

var server = require('net').createServer(); 
server.listen(8081, function () { 
 child1.send('server', server); 
 child2.send('server', server);
 child3.send('server', server); 
 child4.send('server', server);  
 child5.send('server', server); 
 child6.send('server', server); 
 server.close(); 
}); 