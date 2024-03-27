const express = require('express');
const mysql = require('mysql');
var cors = require('cors');
const { homedir } = require('os');

var app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "penpals"
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";

    db.query(sql, [req.body.email,req.body.password], (err, data)=> {
        if (err) throw err;
        if(data.length > 0) {
            return res.json("Login Success")
        }
        else {
            return res.json("No Record")
        }
    })
})

app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening");
})