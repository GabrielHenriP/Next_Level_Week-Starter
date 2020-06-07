const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

// configurar pasta pública
server.use(express.static("public"))

// habilitar o uso do req.body da aplicação
server.use(express.urlencoded({extended: true}))

//utilizando tamplate engine
const nunkucks = require("nunjucks")
nunkucks.configure("src/views", {
    express: server,
    noCache: true
})


// configurar caminhos da minha aplicação
// página inicial
// req: requisição
// res: resposta
server.get("/", function(req, res) {
    return res.render("index.html", {title: "Um título"})
})

server.get("/create-point", function(req, res) {
    return res.render("create-point.html")
})

server.post("/savepoint", function(req, res) {
    //console.log(req.body)

    //inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
        
    ]

    function afterInsertData(erro){
        if (erro){
            return res.render('create-point.html', {notSaved: true})
           //return res.send("erro no cadastro")
        } 
        console.log("cadastrado com sucesso")
        console.log(this)
        return res.render('create-point.html', {saved: true})
        
        
    }

    db.run(query, values, afterInsertData)

    
})


server.get("/search-results", function(req, res) {
    const search = req.query.search
    if(search == ""){
        return res.render("search-results.html", {total: 0})
    }


    //pegar os dados do banco de dados
    db.all(` SELECT * FROM places WHERE city LIKE '%${search}%' `, function(erro, rows) {
        if (erro)
            return console.log(erro)
        
        const total = rows.length

        console.log("Aqui estão seus registros")
        console.log(rows)
        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total: total})
    }) 
    

    
})

//ligar o servidor
server.listen(3000)

