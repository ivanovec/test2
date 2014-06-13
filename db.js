var mysql = require('mysql');
var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'ivan',
	password:'mercdev',
	database:'exapp'
});

module.exports.get = function(q, cb){
	pool.getConnection(function(err, connection){
		if(err) {throw err; return;}
		connection.query(q, function(err, data){
			if(err) {throw err; return;}
			connection.release();
			cb(data);
		});
	});
}
	
module.exports.set = function(q, data, cb){
	pool.getConnection(function(err, connection){
		if(err) {throw err; return;}
		connection.query(q, data, function(err, info){
			if(err) {throw err; return;}
			connection.release();
			cb();
		});
	});
}

module.exports.del = function(q, cb){
	pool.getConnection(function(err, connection){
		if(err) {throw err; return;}
		connection.query(q, function(err, results){
			if(err) {throw err; return;}
			connection.release();
			cb();
		});
	});
}
	

