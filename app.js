let http = require('http')
http.createServer(function(req,res){
    res.end("mensagem no navegador")
}).listen(8081)
console.log("servidor aberto")