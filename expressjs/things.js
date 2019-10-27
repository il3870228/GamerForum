/*routers*/
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.send('GET route on things');
});

router.post('/',function(req,res){
    res.send('POST route on things');
});

/*export router to make it visible to express library*/
module.exports = router; 
