const express = require('express');
const app = express();
var mysql = require('mysql')
const bodyParser = require('body-parser');


const port = process.env.PORT || 4500;
//Middleware
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'marcus_db'
})

connection.connect(function(err){
    if (err) throw err
    console.log('Connected');
})

app.get("/", function (req, res){
    //show this file when the "/" is requested
    res.sendFile(__dirname+"/views/index.html");
    console.log('Fetched html doc')
});

app.get("/home", function (req, res){
    //show this file when the "/" is 
    res.sendFile(__dirname+"/views/home.html");
    console.log('Fetched home doc')
});

app.post('/', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var mobile = req.body.mobile;

    var sql = `INSERT INTO users (name, email, mobile) VALUES ('${name}', '${email}', '${mobile}' )`;

    connection.query(sql, function (err, data) {
    if (err) throw err;
    console.log("Record inserted");
    console.log(data)
    });

    res.redirect('/home');

    connection.end()
});


app.listen(port,()=>{
    console.log(`Server running`)
});