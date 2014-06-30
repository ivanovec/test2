var express = require('express');
var router = express.Router();

var db = require('../db'),
	config = require('../config'),
	helper = require('../helper');
	//test = require('../../goog/test');
 
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* Alternative index */
router.get(config.url.index, function(req, res) {
	//console.log(req.query.user_id);
	db.get(config.query.selectCases, function(results){
		console.log(req.params);		
		res.render('start', {results: results, tab: req.params.tab});
	});
});

/* Add test case form */
router.get(config.url.caseForm, function(req, res) {
  res.render('addcase', { title: 'Add test case' });
});

/* Save to db */
router.post(config.url.addCase, function(req, res) {
	db.set(config.query.addCasesQ, req.body, function(){
		res.redirect(config.url.indexCases);	
	}); 
	console.log(req.body);
	
});

/* Delete from db */
router.post(config.url.delCases, function(req, res) {
	console.log(req.body);
	var ids = helper.prepareJsonToQuery(req.body);
	console.log(ids);
	db.del(config.query.delCases+ids, function(){
		res.redirect(config.url.indexCases);
	}); 
});

/* Addon display condition */
router.get(config.url.cond, function(req, res) {
	console.log(req.query);
	if (req.query.user_id == 'admin'){
		res.writeHead(200, {"Content-Type": "application/json"});
		res.write(JSON.stringify({'shouldDisplay':'true'}));
		res.end(); 
	} else {
			res.writeHead(200, {"Content-Type": "application/json"});
			res.write(JSON.stringify({'shouldDisplay':'false'}));
			res.end();
		}	
});

router.get('/spread', function(req, res){
	res.render('spread', { title: 'google table' });
});

router.get('/admin', function(req, res){
	res.write(test);
	res.end();
});


router.get('/config', function(req, res){
	res.write(test);
	res.end();
});

router.get('/redirect', function(req, res){
	console.log(req.query.code);
	//test.oauth(req.query.code, console.log);
	res.write('test');
	res.end();
});
module.exports = router;
