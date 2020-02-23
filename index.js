const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vasu_shop'
});

mysqlConnection.connect((err)=>{
    if(!err) return console.log('DB connection succeded')
    console.log('DB connection failed', JSON.stringify(err, null, 2))
})

const port = process.env.port || 3002;

app.listen(port, () => {
    console.log('Server listens at 3002');
});

app.get('/',(req,res)=>{
    res.send('Testing');
});

app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee WHERE EmpID =1', (err, rows, fields) =>{
        if(err) console.log(err)
        res.json(rows);
    });
});

app.get('/employee/:id', (req,res)=>{
    mysqlConnection.query('SELECT * FROM employee WHERE EmpID=?',[req.params.id], (err, rows, fields) =>{
        if(err || !rows.length) return res.send('Not data found');
        res.json(rows);
    });
});