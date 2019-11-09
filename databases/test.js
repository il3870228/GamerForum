var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})



var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'database-1.c6d68xlnsq5m.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password : '12345678',
    port: '3306',
    database : 'CS411'
})

connection.connect()

connection.query('SELECT * FROM USER', function (err, result) {
   if (err) throw err

   console.log('The _uid is: ', result[0]._uid)
   console.log('The email is: ', result[0].email)
   console.log('The username is: ', result[0].username)
   console.log('The gender is: ', result[0].gender)
})

connection.end()
