
//https://www.tutorialsteacher.com/nodejs/create-nodejs-web-server

var http = require('http'); // Import Node.js core module
var fs = require('fs');

var server = http.createServer(function (req, res) {   //create web server
    if (req.url == '/') { //check the URL of the current request
        
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    
    }
    else if (req.url == "/login") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is login Page.</p></body></html>');
        res.end();
    
    }
    else if (req.url == "/map") {
        fs.readFile('./map.html', function (err, html) {

            if (err) throw err;    
        
                res.writeHeader(200, {"Content-Type": "text/html"});  
                res.write(html);  
                res.end();  
            })
    }  
    
    
    else
        res.end('Invalid Request!');
    
});

server.listen(5000); //6 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')