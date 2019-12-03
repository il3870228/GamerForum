//////////////////mysql
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
if (myArgs.length == 0) {
    console.log(`no arg provided, will use default port ${myport}`)
} else if (!isNaN(myArgs[0])) {
    console.log(`provided port is ${myArgs[0]}`)
    myport = myArgs[0]
}


var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'database-1.c6d68xlnsq5m.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: '12345678',
    port: '3306',
    database: 'CS411',
    multipleStatements: true
});

// create a promise compatible query
con.constructor.prototype.query_p = (sql) => {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            con.query(sql, (err, result) => {
                resolve(result)
            })
        })
    })
}

con.query_p(`select * from USER;`).then((value) => {
        console.log("first query test run" + `${JSON.stringify(value)}`)
    })    //////////////// mysql

var my_global = 0
con.query_p(`select * from USER;`).then((value) => {
        console.log("second query test run" + `${JSON.stringify(value)}`)
        my_global = 10000
    }).then(()=>{console.log("what the fuck")
    }).then(()=>{console.log(my_global) // return 10000; assignment worked
        }) 
    console.log("my global is ",my_global) // return 0
var express = require('express');
var cors = require('cors'); // Leo Lee's suggestion
var app = express();

app.use(cors()); // Leo Lee's suggestion to remove same origin policy error
app.get('/a', (req, res) => {
    res.send('a');
});

app.get('/a/b', (req, res) => {
    res.send('a/b');
});
var url = require('url');

/*parsing HTTP request body*/
var bodyParser = require('body-parser');

/*for parsing post data into JSON under req.body*/
app.use(bodyParser.json());


/*the following middleware function will be called on every request made to the server, because router is not defiend.*/
app.use(function(req, res, next) {
    //res.send("middleware on all interfaces"); // this line is going to override everything and simply respond
    console.log("A new request received at " + Date.now());

    //This function call is very important. It tells that more processing is
    //required for the current request and is in the next middleware
    // function/route handler.
    next(); // without next(), the process will hang after the middleware function finishes executing.
});

/* Middleware function restricted to a specific route */
app.post('/api*', function(req, res, next) {
    console.log("A post request for api at " + Date.now());
    console.log("request has content:" )
    console.log(req.body);
    next();
});


/********************************/
// login 
// status 1 for success. 0 for failure with message
app.post('/api/login', function(req, res, next) {
    let username = req.body.username 
    let password = req.body.password
    
    // check username
    con.query_p(`select * from USER where username=\'${username}\'`).then((value)=>{
		console.log(value)
        if (value.length == 0){
            // no username 
            res.send("Username not defined")
        }
        else {
            // check for password match
            let flag = false
            for (var i in value){
                if (value[i].username == username && value[i].password == password ){
                    flag = true 
                    break
                }
            }
            if (flag){
                res.send("Success")
            }
            else {
                res.send("Wrong Password")
            }
        }
    })
})



app.post('/api/signup', (req,res,next)=>{
    console.log('signup start')
    var email = req.body.email
    var username = req.body.username
    var password = req.body.password
    con.query_p(`select * from USER where email = \'${email}\'`).then((value)=>{
        if (value.length == 0){
            // no email. check username.
            return con.query_p(`select * from USER where username =\'${username}\'`)
        }
        else {
            res.send("Email already taken")
        } 
    }).then((value)=>{
        if (value.length == 0){  // error is suppressed in case "value" is undefined. 
            return con.query_p(`insert into USER(email,password,username) values (\'${email}\', \'${password}\', \'${username}\'  )`)
        }
        else {
            res.send("Username already taken")
            return Promise.reject() // error is suppressed
        }
    }).then(() => {res.send("Success")}, () => {console.log("suppressed error")})
})

// curl -d '{"username":"lij", "password":"value2","email":"ljlj@"}' -H "Content-Type:application/json" -X POST http://Ec2-3-135-223-12.us-east-2.compute.amazonaws.com:3000/api/signup

app.post('/api/profile',(req,res,next)=>{
    let username = req.body.username
    let FR = 'FRIENDWITH'
    let this_id = -1 // global variable carrying id correponding to username
    let this_email = "" 
    let this_password = ""
    let this_friendname = []
    let this_friendrate = []
    con.query_p(`select * from USER where username = \'${username}\'`).then((value)=>{
        this_id = value[0].userid 
        this_email = value[0].email
        this_password = value[0].password // this_user info get!
        return con.query_p(`\
select u.username as friendname, rate \
from ${FR} f inner join USER u \
on f.friendid = u.userid \
where id = ${this_id} \
order by rate desc; \
\
`)
    }).then((value)=>{ // value is array of object of {friendname,rate}
        console.log(value)
        if (value.length > 0){
            for (let i in value){
                this_friendname.push(value[i].friendname)
                this_friendrate.push(value[i].rate)
            }
        }
        Promise.resolve()
    }).then(()=>{ // friends, resolved
        let result = {email:this_email, password:this_password, friends:this_friendname, friendsRating: this_friendrate }
        res.send(result)
    })
})

app.post('/api/profile/rating',(req,res,next)=>{
    let username = req.body.username
    let friendname = req.body.friend_username
    let rate = req.body.friendsRating

})


/*******************************SHOW CREATE TABLE mytable; show constraints*/

/*saving post; */
var post_save = function(req, res, next) {
    console.log('more things connected');
    let table = 'POST';
    let sql = `insert into ${table}(username,time,content) values (\'${req.body.username}\',\'${req.body.time}\',\'${req.body.content}\')`;
    console.log(sql);
    con.query(sql, function(err, result, fields) {
        // first query is done. second one
    });
    let verify_sql = `select * from ${table}`
    con.query(verify_sql, function(err, result, fields) {
        console.log(result);
    });
    res.send({ id: 1 });

};

app.post('/api/post', post_save);

/*saving comment*/
var comment_save = function(req, res, next) {
    console.log('post comments start');
    let table = 'COMMENTS';
    let sql = `insert into ${table}( postid , username,time,content) values (${req.body.postid},\'${req.body.username}\',\'${req.body.time}\',\'${req.body.content}\')`;
    console.log(sql);
    con.query(sql, function(err, result, fields) {
        if (err) console.log(err);
    });
    let verify_sql = `select * from ${table}`
    con.query(verify_sql, function(err, result, fields) {
        console.log(result);
    });
    res.send({ "the freak?": 'hahahaha' });
};
app.post('/api/post_comment', comment_save);

/*search*/
var search = (req, res, next) => {
    console.log('search here')
    let table = 'POST'
    let sql = `select distinct * from ${table} where username like \'%${req.body.value}%\'`
    console.log(sql)
    con.query(sql, (err, result, fields) => {
        if (err) throw err
        res.send(result)
        console.log('search done')
    })
};
app.post('/api/search', search);

/*get_all basic render functionality for post */
get_all = (req, res, next) => {

    /* start of get_call************************************/
    var promise = new Promise((resolve, reject) => {
        resolve(1);
    })


    var table = 'POST'
    var comments = 'COMMENTS';
    // using a promise to return values from callback function AND enforce order of execution
    var promise = new Promise(function(resolve, reject) {
        var sql = `select * from ${table} order by postid desc`
        console.log(sql)
        Promise.resolve().then(() => {
            var posts = {}
            con.query(sql, function(err, result) {
                console.log('callback is called')
                    // console.log(result)
                posts = result;
                for (var i in posts) {
                    posts[i].comments = []
                }
                // get comments and concat
                //console.log(posts)
                resolve(posts)
            })
        })
    })

    // actual 
    promise.then((value) => {
        console.log('promise 2')
        get_comment(value)
    })

    function get_comment(posts) {
        var sql = `select * from ${comments} order by commentid desc`
        con.query(sql, function(err, result) {
            /*posts still accessible*/
            // console.log(result) 
            for (var i in result) {
                for (var j in posts) {
                    if (result[i].postid == posts[j].postid) {

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
                // console.log(posts_js[0])
                /*because of the scope and stuff I need to res.send here?*/
            res.send(posts_js)
        })
    }
    /* end of get_call************************************/
};
app.post('/api/get', get_all);


/*delete post*/
var post_delete = (req, res, next) => {
    console.log(`start deleting post with post id ${req.body.postid}`);

    // delete all comments first then delete all posts
    let table = 'POST'
    let comment = 'COMMENTS'
        // delete from POST where postid=5;
    let sql = `delete from ${comment} where postid = ${req.body.postid} ;delete from ${table} where postid = ${req.body.postid}`
    console.log(sql);
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log('sql execution success!!!')
        res.send({ id: 'end of delete post!' });
    });
    let verify_sql = `select * from ${table}`
    con.query(verify_sql, function(err, result, fields) {
        console.log(result);
    });
}
app.post('/api/delete_post', post_delete)

/*delete comment*/
var comment_delete = (req, res, next) => {
    console.log('delete comment with id ' + req.body.commentid);
    let table = 'COMMENTS';
    // let sql = `insert into ${table}(username,time,content) values (\'${req.body.username}\',\'${req.body.time}\',\'${req.body.content}\')`;
    // delete from POST where postid=5;
    let sql = `delete from ${table} where commentid = ${req.body.commentid}`
    console.log(sql);
    con.query(sql, function(err, result, fields) {
        if (err) console.log(err);
    });
    let verify_sql = `select * from ${table}`
    con.query(verify_sql, function(err, result, fields) {
        console.log(result);
    });
    res.send({ id: 'success!' });
}
app.post('/api/delete_comment', comment_delete)

/*update comment*/
var comment_update = function(req, res, next) {
    console.log(`start updating comment with comment id ${req.body.commentid}`);
    let table = 'COMMENTS';
    /*update POST set uid=NULL where postid=5;*/
    // let sql = `insert into ${table}(username,time,content) values (\'${req.body.username}\',\'${req.body.time}\',\'${req.body.content}\')`;
    let sql = `update ${table} set content=${req.body.content} where commentid=${req.body.commentid}`;
    console.log(sql);
    con.query(sql, function(err, result, fields) {
        if (err) console.log(err);
    });
    let verify_sql = `select * from ${table}`
    con.query(verify_sql, function(err, result, fields) {
        console.log(result);
    });
    res.send({ id: 'success!update comment' });
};
app.post('/api/update_comment', comment_update);

/*update post; */
var post_update = function(req, res, next) {
    console.log(`start updating post with post id ${req.body.postid}`);
    let table = 'POST';
    /*update POST set uid=NULL where postid=5;*/
    // let sql = `insert into ${table}(username,time,content) values (\'${req.body.username}\',\'${req.body.time}\',\'${req.body.content}\')`;
    let sql = `update ${table} set content=\'${req.body.content}\' where postid=${req.body.postid}`;
    console.log(sql);
    con.query(sql, function(err, result, fields) {
        if (err) console.log(err);
        res.send({ id: 'success!update post' });
    });
    let verify_sql = `select * from ${table}`
    con.query(verify_sql, function(err, result, fields) {
        console.log(result);
    });
};
app.post('/api/update_post', post_update);

/*sanity check*/
app.get('*', (req, res) => {
    res.send('success mee');
});

app.post('*', (req, res) => {
    res.send('DO NOT DO THAAAAAAATTTTTTTTTTTTTTTT')
})


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
let server = app.listen(myport, function() {
    console.log(`Server is running on port ${myport} of all interface`);
});


/*app.method(path, handler): 'method' can be any one of HTTP verbs: get, set, put, delete
different methods: GET : represents a data retrieval
POST: data enclosed in the request as a new object
PUT: modify some data with data enclosed
DELETE: delete specified resource
*/
console.log("start routine at " + myport);
