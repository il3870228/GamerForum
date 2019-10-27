/* importing express and provide an interface
   the 'require' function executes express.js file and return the export object of that file */
var express = require('express');
var app = express();

var url = require('url');

/*parsing HTTP request body*/
var bodyParser = require('body-parser');

/*for parsing post data into JSON under req.body*/
app.use(bodyParser.json());


/*the following middleware function will be called on every request made to the server, because router is not defiend.*/
app.use(function(req, res, next){
	//res.send("middleware on all interfaces"); // this line is going to override everything and simply respond
   console.log("A new request received at " + Date.now());

   //This function call is very important. It tells that more processing is
   //required for the current request and is in the next middleware
    // function/route handler.
   next(); // without next(), the process will hang after the middleware function finishes executing.
});

/* Middleware function restricted to a specific route */
app.use('/things',function(req,res,next){
	console.log("A request for things at "+	Date.now());
	next();
});

/*router*/
var things = require('./things.js');
app.use('/api',things);

/*regex to match all; should be placed after all patterns*/
// app.get('*',function(req,res){
//     res.send('don\'t do this ');
// });


/* app.listen(port,host,backlog,callback)
 * host needs to be set when app is deployed in the cloud
 * backlog: max number of queued pending connections. default 511
 * callback: anc func called when server starts listening for requests
*/
let server = app.listen(3000, function(){
	console.log("Server is running on port 3000 of all interface");
});


/*app.method(path, handler): 'method' can be any one of HTTP verbs: get, set, put, delete
  different methods: GET : represents a data retrieval
  POST: data enclosed in the request as a new object
  PUT: modify some data with data enclosed
  DELETE: delete specified resource
 */
