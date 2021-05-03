/* map.js */

map.set('views', './views');
map.set('view engine', 'pug');
map.use('./users', userRouter); // what is userRouter?

// adding everything we need
var http = require("http");
var qString = require("querystring");
let mapApp = require("app");

// this calls the let db={}; and instantiates the db for us
let dbManager = require('./dbManager');
let express = require("express");
let app = express();
var ObjectID = require('mongodb').ObjectId;
// var userRouter = require('./routes/userRoutes.js') check if needed and if so update path

// Mongoose stuff
let mongoose = require('mongoose');
mongoose.set('bufferCommands', false);
// const actCol=require('./models/activitySchema'); check if needed and update path 
 

// GET ROUTES 
// copied from https://github.com/ProfJake/Final_Version_Act_Server/blob/master/express_act_serv/app.js

//These callback functions in "Express syntax" are called "middleware" functions.
//They sit "in the middle" between your app's backend end functionality
//(in this case, the simple Activity Class, MongoDB, and/or the local
//"server" filesystem) and the client.  Middleware function's 
map.get('/', function (req, res){
	if (!req.session.user){
        res.redirect('/login');
    }
    else{

    	res.render('index', {trusted: req.session.user});
	}

});
map.use(function(req, res, next){
    let now = new Date().toLocaleTimeString("en-US", {timeZone: "America/New_York"});
    console.log(`${req.method} Request to ${req.path} Route Received: ${now}`);
    next();
});

map.get('/login', function(req, res, next){
    if (req.session.user){
        res.redirect('/');
    }else{
        res.render('login');
    }
});
map.get('/insert', function (req, res){
	if (!req.session.user){
        res.redirect('/login');
    }
    else{

    	res.render('insert', {trusted: req.session.user});
	}
});

