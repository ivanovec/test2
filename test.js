var util = require('util');
var colors = require('colors');

var mysql = require('mysql');
var pool = mysql.createPool({
	host:'127.0.0.1',
	user: 'ivan',
	password: 'mercdev',
	database: 'exapp',
	debug: 'true'
});

pool.getConnection(function(err, connection){
	if(err){
		util.log('pool.getConnection error:'.red + '\n' + err);
		process.exit(1);
	}
	util.log('Connection set successfully'.green);
	connection.release();
	process.exit(0);
});