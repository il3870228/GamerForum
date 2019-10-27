/*routers*/
var express = require('express');
var router = express.Router();

/*can embed middleware function before and after
 * the handler function */
router.use('/',function(req,res,next){
	console.log('Start of route handler');
	next();
});

router.get('/',function(req,res,next){
    res.send('GET route on things');
	next();
});

router.use('/',function(req,res,next){
	console.log('End of route handler');
});


router.post('/',function(req,res){
    res.send('POST route on things');
});

/*export router to make it visible to express library*/
module.exports = router; 
