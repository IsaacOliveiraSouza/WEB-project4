const express = require("express")
const app = express()
const bodyparser = require("body-parser")

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
const conn = require("./banco")
//bagui pra usar a pasta public, acho q é onde coloca os ajax
app.use(express.static("public"))
const path = require("path")
app.use("/static", express.static(path.join(__dirname,"public")))

//sessoes de login
const session = require('express-session')
app.use(session({
    secret: 'aaaaaaaa',
    resave : true,
    saveUninitialized : true
}))

//rota da pagina cadastro
app.get("/cadastro", function(req,res){
    res.sendFile(__dirname+"/cadastro.html")
})
//faz o cadastro do usuario na tbl
app.get("/cadastrarUsuario", function(req,res){
    let nome = req.query.nome
    let email = req.query.email
    let senha = req.query.senha
    //let x = {"nome": nome, "email": email, "senha":senha}
    let sql = `insert into tbl_usuario(nome, email, senha) values ('${nome}', '${email}', '${senha}');` 
    conn.query(sql, function(error, result){})
})

//rota da pagina login
app.get("/", function(req,res){
    res.sendFile(__dirname+"/login.html")
})
//variavel q pega o id
let id_usu=""
let id_sala=""
//loga o usuario e manda ele pra pagina principal
app.get('/loginUsuario', function(req,res){
    let email = req.query.email
    let senha = req.query.senha
    let sql = `select id_usuario from tbl_usuario where email = '${email}' and senha = '${senha}'`
    conn.query(sql, function(error, result){
        console.log(result)
        console.log(email)
        console.log(senha)
        //let id = result[ { id_usuario } ]
       // logado(id)
       console.log( req.session.tbl_usuario = `${result[0].id_usuario}`)
        res.redirect('/inicio/'+req.session.tbl_usuario)     
    })
})
//rota da pagina inicial
app.get("/inicio/:id", function(req,res){
    res.sendFile(__dirname+"/paginaInicial.html")
        id_usu = req.params.id
        console.log("id_usu:" + id_usu)
})
//cria sala no banco
app.get("/criar", function(req,res){
    let id = id_usu
    let nomeSala = req.query.nomesala
    console.log(id)
    console.log(nomeSala)
    let x = {"id":id_usu, "nome": nomeSala}
    let sql = `insert into tbl_salas(nome_sala, id_criador) values ('${nomeSala}', '${id_usu}')`
    conn.query(sql, function(error, result){})

    //res.send(x)
})
//Faz o bagui do json pra printar as salas
app.get("/mostrarSalas", function(req,res){
    let sql = `select * from tbl_salas`
    let json = { sucess: '', info: [], erro: '' }
    conn.query(sql, function(error, result){
        json.sucess = true
        for(x in result){
            json.info.push({
                nome: result[x].nome_sala,
                id: result[x].id_sala
            })
        }
        res.json(json)
    })
})
//rota da pagina que representa as salas com o id de uma determinada sala
app.get("/Sala/:id_sala", function(req, res){
    res.sendFile(__dirname+"/salas.html")
    id_sala = req.params.id_sala
})

app.get("/enviarMsg", function(req,res){
    let msg = req.query.msg
    let x = {"idUsu": id_usu, "id_sala":id_sala, "msg":msg}
    let sql = `insert into tbl_mensagem(fk_idsala, mensagem, id_usuario, likes) values('${id_sala}', '${msg}', '${id_usu}', 0)`
    conn.query(sql, function(error, result){})
    res.send(x)
    //res.send(x)
})

app.get("/mostrarMsg", function(req,res){
    let sql = `select mensagem from tbl_mensagem where fk_idsala =${id_sala}`
    let json = { sucess: '', info: [], erro: '' }
    conn.query(sql, function(error, result){
        json.sucess = true
        for(x in result){
            console.log(result[x].mensagem)
            json.info.push({
                msg: result[x].mensagem
            })
        }
        res.json(json)
    })
})

app.listen(8080,function(){
    console.log("servidor rodando:)")
})