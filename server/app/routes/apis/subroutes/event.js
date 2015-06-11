var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Event = mongoose.model('Event');

router.get('/', function (req, res, next){
	Event.find({})
	.exec()
	.then(function (event){
		res.send(event)
	})
	.then(null, next);;
});

router.get('/:id', function (req, res, next){
	Event.findOne({_id: req.params.id})
	.exec()
	.then(function (event){
		res.send(event);
	})
	.then(null, next);;
});

router.post('/', function (req, res, next){	
	Event.create(req.body)
	.then(function(){
		console.log("got here");
		res.send({message: 'event was saved'});
	})
	.then(null, next);
});

router.delete('/:id', function (req, res, next){
	Event.remove({_id: req.params.id})
	.exec()
	.then(function(){
		res.send({message: 'event successfully removed'});
	})
	.then(null, next);
});
