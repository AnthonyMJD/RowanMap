/* dbManager.js

Code adapted from: 
https://github.com/ProfJake/Final_Version_Act_Server/blob/master/express_act_serv/dbManager.js


Code adapted from : https://branche.online/mongodb-with-promises/
You can use this as a starting point for your own database manager class, in
your semester projects.

Its a bad habit to open and close a connection EVERY time you want to do 
something.Its better to "pool" connections (in other words maintain a standard
group size) and cycle through what is available.  In this scenario, our pool
size is only one. This is essentially a "singleton" design pattern.

While this simplifies a lot of things (only one connection to manage), it can
create a bottleneck because all of our data is going down the same pipeline.
Data intensive applications might have several connections managed by an
object (like in our chat lab) and some meta data.

dbName is a string that names the DB you want to connect to.  You can opt to
modify this file to hardcode the DB name if you prefer. */

const MongoClient = require('mongodb').MongoClient;
var getID = require('mongodb').ObjectID();
var url = "mongodb://127.0.0.1:27017/";
let database = {};
//https://stackoverflow.com/questions/61277898/useunifiedtopology-true-pass-deprecated
let mongoClient = MongoClient(url,{ useUnifiedTopology: true });
let myDB; //let provides closure, so only one local copy of our db. Th
//functionally makes this static (one copy for all instances)

//you can call connect in your code, but it is not advised, it is safer to use
//"get" to initialize and use connections.
var connect = async function(dbName){
    try{
	await mongoClient.connect();
//	await mongoClient.db("admin").command({ ping: 1 });

	myDB=mongoClient.db(dbName);
	
	if (!myDB){
	    throw new Error("DB Connection Failed to start!");
	}
	else{
	    console.log(`Connected to ${dbName}`);
	    return myDB;
	}
    } catch(e){
	console.log(e.message);
    }
}
//Call get("<name_of_your_DB"> to initialize the db connection
//after that you can can call get() to just get the connection anywhere
database.get = function(dbName){
    if (myDB){
	//	console.log("Already connected!");
	return myDB;
    } else {
	return connect(dbName);
    }
}
//call close in your apps when you want to close the DB connection
database.close = async function(){

    try{
	await mongoClient.close();
	return;
    } catch(e){
	console.log(e.message);
    }
 }
    
module.exports = database;