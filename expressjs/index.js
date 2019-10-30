/* sql part*/
/*mysql stuff*/
// var mysql = require('mysql');
// var con = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "cs411",
// 	database: "test"
// });

var myport = 3000
console.log(process.argv)
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
if (myArgs.length == 0  ){
	console.log(`no arg provided, will use default port ${myport}`)
}
else if (!isNaN(myArgs[0])){
	console.log(`provided port is ${myArgs[0]}`)
	myport = myArgs[0]
}


var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'database-1.c6d68xlnsq5m.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password : '12345678',
    port: '3306',
    database : 'CS411'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
	let table = 'USER';
	let sql = `select * from ${table}`;
	console.log(sql);
	con.query(sql,function(err,result,fields){
		//console.log(result)
	});

	});


/* importing express and provide an interface
   the 'require' function executes express.js file and return the export object of that file */


var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
app.get('*',(req,res)=>{
	res.send('success mee');
});

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
app.post('/api*',function(req,res,next){
	console.log("A post request for api at "+	Date.now());
	console.log(req.body);
	next();
});

/*saving post; */
var post_save = function(req,res,next){
	console.log('more things connected');
		let table = 'POST';
		let sql = `insert into ${table}(username,time,content) values (\'${req.body.username}\',\'${req.body.time}\',\'${req.body.content}\')`;
		console.log(sql);
		con.query(sql,function(err,result,fields){
			if (err) console.log(err);
		});
		let verify_sql = `select * from ${table}`
		con.query(verify_sql,function(err,result,fields){
			console.log(result);
		});
		res.send({id:1});
	
};

app.post('/api/post',post_save);

/*saving comment*/
var comment_save = function(req,res,next){
		console.log('more things connected');
		let table = 'COMMENTS';
		let sql = `insert into ${table}( postid , username,time,content) values (${req.body.postid},\'${req.body.username}\',\'${req.body.time}\',\'${req.body.content}\')`;
		console.log(sql);
		con.query(sql,function(err,result,fields){
			if (err) console.log(err);
		});
		let verify_sql = `select * from ${table}`
		con.query(verify_sql,function(err,result,fields){
			console.log(result);
		});
		res.send({"the freak?":'hahahaha'});
};
app.post('/api/comment',comment_save);

/*search*/
var search = (req,res,next)=>{
	
};
app.post('/api/search');

/*get_all basic render functionality for post */
get_all = (req,res,next) => {

/* start of get_call************************************/
var promise = new Promise((resolve,reject)=>{
	resolve(1);
})


var table = 'POST'
var comments = 'COMMENTS';
// using a promise to return values from callback function AND enforce order of execution
var promise = new Promise(function(resolve,reject){
	var sql = `select * from ${table} order by postid asc`
	console.log(sql)
	Promise.resolve().then(()=>{
		var posts={}
		con.query(sql,function(err,result){
			console.log('callback is called')
			// console.log(result)
			posts = result;
			for (var i in posts){
				posts[i].comments = []	
			}
			// get comments and concat
			//console.log(posts)
			resolve(posts)
		})
	}) 
})

// actual 
promise.then((value)=>{
	console.log('promise 2')
	get_comment(value)
})

function get_comment(posts){
	var sql = `select * from ${comments} order by commentid asc`
	con.query(sql,function(err,result){
		/*posts still accessible*/
		// console.log(result) 
		for (var i in result){
			for (var j in posts){
				if (result[i].postid == posts[j].postid){

					let js_result = JSON.parse(JSON.stringify(result[i]))
					// console.log('pushed comment')
					// console.log(js_result)
					posts[j].comments.push(js_result)
					break
				}
			} // eofl inner loop
		} // eofl outer loop
	console.log('end of get comment')
	let posts_js = JSON.parse(JSON.stringify(posts))
	// console.log(posts_js)
	console.log('doomsday')
	console.log(posts_js[0])
	/*because of the scope and stuff I need to res.send here?*/
	res.send(posts_js)
	})
}
/* end of get_call************************************/
};
app.post('/api/get',get_all);


/*delete post*/

var post_deleten = (req,res,next)=>{
	console.log(`start deleting post with post id ${req.body.postid}`);
		let table = 'POST';
		// let sql = `insert into ${table}(username,time,content) values (\'${req.body.username}\',\'${req.body.time}\',\'${req.body.content}\')`;
		// delete from POST where postid=5;
		let sql = `delete from ${table} where ${req.body.postid}`
		console.log(sql);
		con.query(sql,function(err,result,fields){
			if (err) console.log(err);
		});
		let verify_sql = `select * from ${table}`
		con.query(verify_sql,function(err,result,fields){
			console.log(result);
		});
		res.send({id:'success!'});
}
app.post('/api/delete', post_delete)



/*update post; */
var post_update = function(req,res,next){
	console.log(`start updating post with post id ${req.body.postid}`);
		let table = 'POST';
		/*update POST set uid=NULL where postid=5;*/
		// let sql = `insert into ${table}(username,time,content) values (\'${req.body.username}\',\'${req.body.time}\',\'${req.body.content}\')`;
		let sql = `update ${table} set content=${req.body.content} where postid=${req.body.postid}`;
		console.log(sql);
		con.query(sql,function(err,result,fields){
			if (err) console.log(err);
		});
		let verify_sql = `select * from ${table}`
		con.query(verify_sql,function(err,result,fields){
			console.log(result);
		});
		res.send({id:'success!'});
};
app.post('/api/update_post',post_update);

app.get('*',(req,res)=>{
	res.send('success mee');
});



/*router*/
// var things = require('./things.js');
// app.use('/api',things);

/*regex to match all; should be placed after all patterns*/
// app.get('*',function(req,res){
//     res.send('don\'t do this ');
// });


/* app.listen(port,host,backlog,callback)
 * host needs to be set when app is deployed in the cloud
 * backlog: max number of queued pending connections. default 511
 * callback: anc func called when server starts listening for requests
*/
let server = app.listen(myport, function(){
	console.log(`Server is running on port ${myport} of all interface`);
});


/*app.method(path, handler): 'method' can be any one of HTTP verbs: get, set, put, delete
  different methods: GET : represents a data retrieval
  POST: data enclosed in the request as a new object
  PUT: modify some data with data enclosed
  DELETE: delete specified resource
 */
console.log("start routine at "+myport);



