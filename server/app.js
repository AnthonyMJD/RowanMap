//website helping us setup a signup page
//https://www.geeksforgeeks.org/signup-form-using-nodejs-and-mongodb/


var express=require("express");
var bodyParser=require("body-parser");
var fs = require('fs');
var http = require('http');
  
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RowanMap');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
  
var app=express()
  
  
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/map', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var pass = req.body.password;
    var phone =req.body.phone;
  
    var data = {
        "name": name,
        "email":email,
        "password":pass,
        "phone":phone
    }
db.collection('users').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    fs.readFile('./map.html', function (err, html) {

        if (err) throw err;    
    
            res.writeHeader(200, {"Content-Type": "text/html"});  
            res.write(html);  
            res.end();  
        })
})
  
app.get('/',function(req,res){
res.set({
    'Access-control-Allow-Origin': '*'
    });
    fs.readFile('./index.html', function (err, html) {

        if (err) throw err;    
    
            res.writeHeader(200, {"Content-Type": "text/html"});  
            res.write(html);  
            res.end();  
        })
}).listen(3000)
  
  
console.log("server listening at port 3000");