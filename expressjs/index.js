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
                if (err){
                    reject(err)
                }
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
var recommend = require('./collaborative_filter')

app.use(cors()); // Leo Lee's suggestion to remove same origin policy error
app.get('/a', (req, res) => {
    res.send('a');
});

app.get('/a/b', (req, res) => {
    res.send('a/b');
});




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
    let new_rate = req.body.friendsRating
    let this_user_id = -1
    let this_friend_id = -1
    con.query_p(`select userid from USER where username = \'${username}\'`).then((value)=>{
        this_user_id = value[0].userid
        return con.query_p(`select userid from USER where username = \'${friendname}\'`)
    }).then((value)=>{
        this_friend_id = value[0].userid
    }).then(()=>{con.query_p(`update FRIENDWITH set rate = ${new_rate} where id = \'${this_user_id}\' and friendid = \'${this_friend_id}\'`)
    }).then(()=>{
        let a = "profile rating updated"
        console.log(a)
        res.send(a)
    })
})


app.post('/api/toprank',(req,res,next)=>{
    let game_id = req.body.game 
    con.query_p(`\
select u.username as username, p.rank \
from PLAYED p inner join USER u on p.userid = u.userid \
where gameid = ${game_id}  \
order by p.rank desc \
limit 5 \
\
`).then((value)=>{
    let this_rank = []
    let this_score = []
    for (let i in value){
        this_rank.push(value[i].username)
        this_score.push(value[i].rank)
    }
    let result = {"ranking":this_rank, "score":this_score}
    res.send(result)
}).then(()=>{
    console.log("successful toprank")
})
})

app.post('/api/recommend', (req,res,next)=>{
    // TODO: insert game_username as well
    let game = req.body.game 
    let username = req.body.username
    let ranking = parseInt(req.body.ranking)
    let role = req.body.role
    let userid = -1

    let universe = [] // used for recommendation algorithm
    let output = []

    console.log("game id is " + game)
    con.query_p(`select userid from USER where username = \'${username}\'`).then((value)=>{
        userid = value[0].userid
        // check if existent
        return con.query_p(`select * from PLAYED where userid=${userid} and gameid=${game}`)
    }).then((value)=>{
        console.log('user id is ')
        console.log(userid)
        if (value.length == 0){
            return Promise.reject()
        }
        else{
            return Promise.resolve()
        }
    }).then((resolved)=>{
        // only update
        let sql = `update PLAYED set \`rank\` = ${ranking}, favoriteposition = \'${role}\' where gameid = ${game} and userid = ${userid}`
        console.log(sql)
        con.query_p(sql)
        console.log("recommendation updated!")
    }, (rejected)=>{
        // insert new 
        let sql = `insert into PLAYED values (${game},${userid},\'${role}\',${ranking},null)`
        console.log(sql)
        con.query_p(sql)
        console.log("recommendation inserted!")
    }).then(()=>{
        // use filter to find recommmendations for game "game"
        //Data_base for all user: list of object: list of  {id, score, position, friend_list}
        // friend_list: [{user_id, rating}] from table FRIENDWITH
        return con.query_p(`select userid as id, \`rank\` as score , favoriteposition as position from PLAYED where gameid = ${game}`)
    }) .then((value)=>{
        universe = JSON.parse(JSON.stringify(value)) // deep copy
        for (let i in universe){
            universe[i].friend_list = []
        }
        return con.query_p(`select id, friendid as user_id, rate as rating from FRIENDWITH`)
    }).then((value)=>{
        let friends = value
        for (let i in universe){
            for (let j in friends){
                if (universe[i].id == friends[j].id){
                    universe[i].friend_list.push({user_id: friends[j].user_id , rating: friends[j].rating })
                }
            }
        }
        let input_date = []        
        let _arr = []
        for (let i in universe){
            _arr.push(universe[i].score)
            if (universe[i].id == userid){
                input_date = JSON.parse(JSON.stringify(universe[i])) // deep copy
            }
        }
        let max_score = Math.max(..._arr)
        output = recommend(input_date, universe, max_score) // list of {user_id, ...}
        // res.send(['one','otwo','three'])
    }).then((value)=>{
        return con.query_p(`select username, userid from USER `)
    }).then((value)=>{
        let recommened_friend = []
        for (let i in output){
            for (let j in value){
                if (output[i].user_id == value[j].userid){
                    recommened_friend.push(value[j].username)
                }
            }
        }

        res.send(['1','2','3'])
        res.send(recommened_friend)
    })
})




app.post('/api/recommend/add',(req,res)=>{
    let this_username = req.body.username 
    let this_userid = -1 
    let this_selected_friend_name = req.body.selectedFriends
    let this_selected_friend_id = []
    let this_map = []
    con.query_p(`select username, userid from USER`).then((value)=>{
        this_map = JSON.parse(JSON.stringify(value))
    })

    res.send('done')
})


app.post('/api/recommend/add',(req,res)=>{

    res.send('done')
})

app.post('/api/possibleFriends',(req,res)=>[
    
    res.send(['friend one','firn1','wiw','wafawfawef'])
])

app.post('/api/possibleFriends/add',(req,res)=>[
    
    res.send(1)
])


/*SHOW CREATE TABLE mytable; show constraints*/

/*saving post; should be divided into PUBG and OVERWATCH */
var post_save = function(req, res, next) {
    // console.log('more things connected');
    // let table = 'POST';
    // let sql = `insert into ${table}(username,time,content) values (\'${req.body.username}\',\'${req.body.time}\',\'${req.body.content}\')`;
    // console.log(sql);
    // con.query(sql, function(err, result, fields) {
    //     // first query is done. second one
    // });
    // let verify_sql = `select * from ${table}`
    // con.query(verify_sql, function(err, result, fields) {
    //     console.log(result);
    // });
    // res.send({ id: 1 });
    let this_username = req.body.username 
    let this_time = req.body.time
    let this_userid = -1
    let this_content = req.body.content 
    let this_game = (req.body.game == 'PUBG')? 1:0
    con.query_p(`select userid from USER where username = \'${this_username}\'`).then((value)=>{
        this_userid = value[0].userid
        con.query_p(`insert into POST(userid,time,content,gameid) values (${this_userid},\'${this_time}\',\'${this_content}\' , ${this_game})`)
    }).then(()=>{
        res.send({userid: this_userid, username: this_username})
        console.log("post saved!!!!")
    })

};
app.post('/api/post', post_save);


/*search*/
var search = (req, res, next) => {
    console.log('search here')
    let sql = `select distinct * from POST p inner join USER u on p.userid = u.userid where u.username like \'%${req.body.value}%\'`
    con.query_p(sql).then((value)=>{
        res.send(value)
    })
};
app.post('/api/search', search);

/*get_all basic render functionality for post */
app.post('/api/get', (req,res,next)=>{
    let this_posts = []
    let this_comments = []
    let this_game = (req.body.game == 'PUBG')? 1:0 // 1 for PUBG, 0 for Overwatch

    con.query_p(`select p.postid, p.content, p.time, u.username from POST p inner join USER u on p.userid = u.userid  where gameid = ${this_game} order by postid desc`).then((value)=>{
        this_posts = JSON.parse(JSON.stringify(value))
        for (let i in this_posts){
            this_posts[i].comments = []
        }
        console.log("comments field inserted into this_posts")
        return con.query_p(`select c.commentid, c.content, c.time, c.postid, u.username from COMMENTS c inner join USER u on c.userid = u.userid order by commentid desc`)
    }).then((value)=>{
        this_comments = JSON.parse(JSON.stringify(value))
    }).then(()=>{
        for (let i in this_comments){
            for (let j in this_posts){
                if (this_comments[i].postid == this_posts[j].postid){
                    this_posts[j].comments.push(this_comments[i])
                    break
                }
            }
        }
        console.log("render !!!!!!!!!!!!!!!")
        console.log(this_posts)
        res.send(this_posts)
    })
});


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
}
app.post('/api/delete_post', post_delete)




/* comments are connected to posts.  */
app.post('/api/post_comment', (req,res,next)=>{
    let this_postid = req.body.postid 
    let this_username = req.body.username
    let this_userid = -1
    let this_time = req.body.time
    let this_content = req.body.content
    con.query_p(`select userid from USER where username = \'${this_username}\' `).then((value)=>{
        this_userid = value[0].userid 
        con.query_p(`insert into COMMENTS (content, time, postid, userid) values (\'${this_content}\', \'${this_time}\' , ${this_postid} , ${this_userid})`)
    }).then(()=>{
        console.log("comment saved!!!!!!!!!!!!!!!!!!!")
        res.send("comment saved")
    })
});

/*delete comment*/
var comment_delete = (req, res, next) => {
    console.log('delete comment with id ' + req.body.commentid);
    let table = 'COMMENTS';
    // let sql = `insert into ${table}(username,time,content) values (\'${req.body.username}\',\'${req.body.time}\',\'${req.body.content}\')`;
    // delete from POST where postid=5;
    let sql = `delete from ${table} where commentid = ${req.body.commentid}`
    console.log(sql);
    con.query_p(sql).then(()=>{
        res.send({ id: 'success!' });
    })
}
app.post('/api/delete_comment', comment_delete)

/*update comment*/
var comment_update = function(req, res, next) {
    console.log(`start updating comment with comment id ${req.body.commentid}`);
    let table = 'COMMENTS';
    /*update POST set uid=NULL where postid=5;*/
    // let sql = `insert into ${table}(username,time,content) values (\'${req.body.username}\',\'${req.body.time}\',\'${req.body.content}\')`;
    let sql = `update ${table} set content=${req.body.content} where commentid=${req.body.commentid}`;
    con.query_p(sql).then(()=>{
        res.send({ id: 'success!update comment' });
    })
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
};
app.post('/api/update_post', post_update);

/*sanity check*/
app.get('*', (req, res) => {
    // con.query_p(`insert into FRIENDWITH values (1,1,2);`).then(()=>{res.send('success!!!')}, ()=>{res.send('failed!!!!')})
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////GARBAGE COLLECTION///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// get_all = (req, res, next) => {

//     /* start of get_call************************************/
//     var promise = new Promise((resolve, reject) => {
//         resolve(1);
//     })


//     var table = 'POST'
//     var comments = 'COMMENTS';
//     // using a promise to return values from callback function AND enforce order of execution
//     var promise = new Promise(function(resolve, reject) {
//         var sql = `select * from ${table} order by postid desc`
//         console.log(sql)
//         Promise.resolve().then(() => {
//             var posts = {}
//             con.query(sql, function(err, result) {
//                 console.log('callback is called')
//                     // console.log(result)
//                 posts = result;
//                 for (var i in posts) {
//                     posts[i].comments = []
//                 }
//                 // get comments and concat
//                 //console.log(posts)
//                 resolve(posts)
//             })
//         })
//     })

//     // actual 
//     promise.then((value) => {
//         console.log('promise 2')
//         get_comment(value)
//     })

//     function get_comment(posts) {
//         var sql = `select * from ${comments} order by commentid desc`
//         con.query(sql, function(err, result) {
//             /*posts still accessible*/
//             // console.log(result) 
//             for (var i in result) {
//                 for (var j in posts) {
//                     if (result[i].postid == posts[j].postid) {

//                         let js_result = JSON.parse(JSON.stringify(result[i]))
//                             // console.log('pushed comment')
//                             // console.log(js_result)
//                         posts[j].comments.push(js_result)
//                         break
//                     }
//                 } // eofl inner loop
//             } // eofl outer loop
//             console.log('end of get comment')
//             let posts_js = JSON.parse(JSON.stringify(posts))
//                 // console.log(posts_js)
//             console.log('doomsday')
//                 // console.log(posts_js[0])
//                 /*because of the scope and stuff I need to res.send here?*/
//             res.send(posts_js)
//         })
//     }
//     /* end of get_call************************************/
// };