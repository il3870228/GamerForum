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

/* data JSON trial */
data = function(req,res,next){
	console.log(req.body);
};
app.post('/data',data);

/*incase form is submitted using get */
data_get = (req,res,next)=>{
	console.log(url.parse(req.url,true));
	let query = url.parse(req.url, true).query;
};
app.get('/data',data_get);


// app.get('/',function(req,res){
// 	res.send("Hello");
// });

/* different method on the same route */
app.post('/',function(req,res){
	  res.send("you just called post on /!!");
});

/* special method called 'all' that handles all HTTP request*/
app.all('/test', function(req, res){
    res.send("all kinds of request handled\n");
});



app.get('/hello',function(req,res){
	  res.send("hello is called");
});

/*router*/
var things = require('./things.js');
app.use('/things',things);
/*app.use() will attach 'things' router with the route '/things'*/

/*anonymous function trial*/
a = (req,res)=>{res.send('get on things with version a \n')};
app.all('/thing',a);


/*third party middleware*/
// var third = require('third_party.js');
// app.use('/third',third);

/** dynamic route:
 when this route is specified below other routes, then if none of the other routes is matched, the request will be routed here and treated as id
If this route is placed at the top, all the requests will be interpreted as IDs.*/
app.get('/:id', function(req, res){
    res.send('The id you specified is ' + req.params.id);
});

/* can use req.params.id or req.params.name to access different parameters*/
app.get('/things/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

/*match with regex*/
app.get('/things/:id([0-9]{5})', function(req, res){
    res.send('id: ' + req.params.id);
});

/*regex to match all; should be placed after all patterns*/
app.get('*',function(req,res){
    res.send('there is no match');
});


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
