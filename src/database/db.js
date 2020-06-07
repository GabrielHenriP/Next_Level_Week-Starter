// importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// utilizar o objeto de banco de dados para operações
/*
db.serialize(() => {
    // com comandos SQL:
    //1 criar tabela 
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //2 inserir dados na tabela
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
        "",
        "Paperside",
        "Gabriel henriques",
        "número 260",
        "Pará",
        "Belém",
        "resíduos eletronicos"

    ]

    function afterInsertData(erro){
        if (erro)
            return console.log(erro)
        
        console.log("cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    //3 consultar os dados da tabela
    db.all(`SELECT * FROM places`, function(erro, rows) {
        if (erro)
            return console.log(erro)
        
        console.log("Aqui estão seus registros")
        console.log(rows)
    }) 
    

    //4 deletar um dado da tabela
    db.run(`DELETE FROM places WHERE id = ?`, [1], function (erro) {
        if (erro)
            return console.log(erro)

        console.log("registro deletado com sucesso")
    }) 

    

}) 
*/




