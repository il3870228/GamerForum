/* importing express and provide an interface
   the 'require' function executes express.js file and return the export object of that file */
var express = require('express');
var app = express();

app.get('/',function(req,res){
	res.send("Hello");
});

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
a = (req,res)=>{res.send('get on things with version a \n')};
app.all('/thing',a);


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
app.listen(3000);


/*app.method(path, handler): 'method' can be any one of HTTP verbs: get, set, put, delete
  different methods: GET : represents a data retrieval
  POST: data enclosed in the request as a new object
  PUT: modify some data with data enclosed
  DELETE: delete specified resource
 */
