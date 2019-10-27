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
	res.send('router api this' + i);
});


router.get('*',function(req,res){
    res.send('don\'t do this in api router');
});


/*export router to make it visible to express library*/
module.exports = router; 
