let express = require('express');
let app = express();

app.set('view engine', 'pug')
app.set('views', './src.views')

// adding everything we need
var http = require("http");
var qString = require("querystring");

// this calls the let db={}; and instantiates the db for us
let dbManager = require('./dbManager');
var ObjectID = require('mongodb').ObjectId;
var userRouter = require('./routes/users.js') //check if needed and if so update path

// Mongoose stuff
let mongoose = require('mongoose');
mongoose.set('bufferCommands', false);

// const actCol=require('./models/activitySchema'); check if needed and update path 
 
//Login Stuff
// npm install all required libraries below
let bp = require('body-parser');
let session = require('express-session');
let crypto = require('crypto');
// const userCol = require("./models/userSchema"); <-- we prob need this 

function genHash(input){
    return Buffer.from(crypto.createHash('sha256').update(input).digest('base32')).toString('hex').toUpperCase();
}

//This has been modified to return a Mongoose Model instance (a document)
function docifyActivity(params){
    let doc = new actCol({ activity: { type : params.activity.toString().toLowerCase() }, weight: params.weight,
		distance: params.distance, time: params.time, user: params.user});
    return doc;
}
/* function docifyUser(params){
    let doc = new actCol({ activity: { type : params.activity.toString().toLowerCase() }, weight: params.weight,
			   distance: params.distance, time: params.time, user: params.user\
			 });
    return doc;
} */

var postParams;

//The order of provided routing functions matters.  They work similarly to
//cases in a switch statement.  The first matching route is run.
//the response methods 'send' and 'end' will end the "request response cycle"
//If the cycle is not ended then the request will "hang".
// These are NOT the same methods provided by the standard response object of HTTP
//But instead are methods provided by Express.   A full list of methods that can
//be used to end the cycle
app.set('views', './views');
app.set('view engine', 'pug');
// app.use('/users', userRouter); we need to add this 

app.use(session({
	secret:'shhhhh',
	saveUninitialized: false,
	resave: false
}));

// GET ROUTES 
// copied from https://github.com/ProfJake/Final_Version_Act_Server/blob/master/express_act_serv/app.js

//These callback functions in "Express syntax" are called "middleware" functions.
//They sit "in the middle" between your app's backend end functionality
//(in this case, the simple Activity Class, MongoDB, and/or the local
//"server" filesystem) and the client.  Middleware function's 

app.get('/', function (req, res){
	if (!req.session.user){
        res.redirect('/login');
    }
    else{
    	res.render('index', {trusted: req.session.user});
	} 
});
app.use(function(req, res, next){
    let now = new Date().toLocaleTimeString("en-US", {timeZone: "America/New_York"});
    console.log(`${req.method} Request to ${req.path} Route Received: ${now}`);
    next();
});
app.get('/login', function(req, res, next){
    if (req.session.user){
        res.redirect('/');
    }else{
        res.render('login');
    }
});
app.get('/insert', function (req, res){
	if (!req.session.user){
        res.redirect('/login');
    }
    else{
    	res.render('insert', {trusted: req.session.user});
	}
});

var postData;

// POST Routes
/* app.post('/login', express.urlencoded({extended:false}), async (req, res, next)=>{
	let untrusted= {user: req.body.userName, password: genHash(req.body.pass)};
	console.log(untrusted.password)
	try{
		let result = await userCol.findOne({_id: req.body.userName});
		if (untrusted.password.toString().toUpperCase()==result.password.toString().toUpperCase()){
			let trusted={name: result._id.toString()};
            req.session.user = trusted;
			res.redirect('/');
		} else{
			res.redirect('/login');
		}
	} catch (err){
		next(err)		
	}
}); */


app.listen(5000, async () => {
    /* try {
        await mongoose.connect('mongodb://localhost:27017/practiceDB' <-- need to make that route to our DB, {useNewUrlParser: true, useUnifiedTopology: true })
    }
    catch (e) {
        console.log(e.message);
    } */
    console.log('Listening on port 5000...');

  });