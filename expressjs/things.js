/*routers*/
var express = require('express');
var router = express.Router();

/*can embed middleware function before and after
 * the handler function */
router.use(function(req,res,next){
	console.log('Start of route handler');
	next();
});

var i = 0;

router.get('/this',(req,res,next)=>{
	i = i + 1; 
	res.send("I wonder what this is ${obj}");
});


router.post('/this',(req,res,next)=>{
	let object = req.body;
	console.log(object);
	res.send(object);
});




/* sql part*/



router.all('*',function(req,res){
    res.send('don\'t do this in api router');
});


/*export router to make it visible to express library*/
module.exports = router; 
