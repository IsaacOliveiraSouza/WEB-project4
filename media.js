const express=require("express")
const app = express()
const bodyparser = require("body-parser")

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
const conn = require("./banco")

app.use(express.static("public"))
const path = require("path")
app.use("/static", express.static(path.join(__dirname,"public")))

app.get("/", function(req,res){
    res.sendFile(__dirname+"/media.html")
})//até aq é 'padrao'

app.get("/enviarNotas/:n1/:n2",function(req,res){
    let nota1 = req.params.n1
    let nota2 = req.params.n2
    let x = {"nota1": nota1, "nota2": nota2}
    let sql = `insert into tabelasla(nota1, nota2) values(${nota1}, ${nota2})` 
    conn.query(sql, function(error, result){})
    /*let sql = `select * from sla where id == ${sla2}`
    conn.query(sql, function(error, result){
        res.send(result)
        if (result[0].nota1 == nota1){}
    })
    //res.send(x)
    res.redirect("/")*/
})



app.listen(8081,function(){
    console.log("servidor rodando:)")
})//esse aq é padrao tbm