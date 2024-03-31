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
            //return data.XP, data.XPD
            return res.json("LoginSuccess")
        }
        else {
            return res.json("No Record")
        }
    })
})

app.post('/signUp', (req, res) => {
    const sql = "SELECT CASE WHEN EXISTS (SELECT * FROM login WHERE email = ?) THEN 'T' ELSE 'F' END"
    db.query(sql, [req.body.email], (err, data)=> {
        if (err) throw err;
        ret = JSON.stringify(data);
        ret2 = ret.substring(ret.length-4,ret.length-3)
        if(ret2 === "T") {
            return res.json("SignUpFail")
        }
        else {
            const sql = "INSERT INTO login (email, password) VALUES (?,?);"
            db.query(sql, [req.body.email,req.body.password], (err, data)=> {
                if (err) throw err;
                else {
                    return res.json("SignUpSuccess")
                }
            })
        }
    })
})

app.post('/goals', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ?";

    db.query(sql, [req.body.user], (err, data)=> {  
        //console.log(data)

        if (err) throw err;
        if(data.length > 0) {
            return res.json(data)
        }
    })
})

app.post('/goalSetup', (req, res) => {
    const sql = "UPDATE login SET `XPG` = ?, `XPD` = ?, `WSG` = ?, `WSD` = ?, `WTG` = ?, `WTD` = ?, `HG` = ?, `HD` = ? WHERE email = ?";

    db.query(sql, [req.body.XP, req.body.XPD, req.body.WS, req.body.WSD, req.body.WT, req.body.WTD, req.body.H, req.body.HD, req.body.user], (err, data)=> {
        if (err) throw err;
        else {
            return res.json("Success")
        }
    })
})

app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening");
})