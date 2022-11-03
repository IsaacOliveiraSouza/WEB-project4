const mysql = require("mysql2")
const conn= mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database : "redesocial"
})
module.exports = conn
//dale