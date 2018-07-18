var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Library = require('./models/library'); 


// Connect to the beerlocker MongoDB
var conn = mongoose.connect('mongodb://localhost:27017/mydb');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//set ejs
app.set('view engine' , 'ejs');
app.set('views','./views');


app.get('/index',function(req,res){
	Library.find()
	.then(function(doc){
		res.render('index',{results : doc});
	});
});

app.get('/form-add',function(req,res){
	res.render('form-add');
});
app.post('/add',function(req,res){
	var item = {
		id : req.body.id,
		name : req.body.name,
		type : req.body.type,
		author : req.body.author
	}
	Library.collection.insert(item);	
	res.redirect('/index');

});

app.get('/delete/:id',function(req,res){
	var id = req.params.id;
	Library.collection.remove({'id': id});
	res.redirect('/index');
});

app.get('/form-edit/:id',function(req,res){
	var id = req.params.id;
	Library.findOne({ id: id}, function (err, doc){
	  	res.render('form-edit',{data : doc});
	});
});

app.post('/edit',function(req,res){
	var id = req.body.id;
	Library.update(id, req.body) 
	.then(doc => {
    	if (!doc) {
    		return res.status(404).end();
    	}
    	return res.status(200).json(doc);
    })
    .catch(err => next(err));
    res.redirect('/index');
});
app.listen(3000);