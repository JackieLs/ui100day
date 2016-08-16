
const excuteQuery = require('../db/excuteQuery');


function Works(){}

Works.prototype.select = function(param, callback){
	var query = 'SELECT * FROM ui_work '+ param
	excuteQuery(query, callback);
}

Works.prototype.insert = function(param, callback){
	var query = 'INSERT INTO ui_work '+ param;
	console.log(query);
	excuteQuery(query, callback);
}

Works.prototype.update = function(param, callback){
	var query = 'UPDATE ui_work SET '+ param;
	excuteQuery(query, callback);
}

Works.prototype.delete = function(param, callback){
	var query = 'DELETE FROM ui_work '+ param;
	excuteQuery(query, callback);
}

module.exports = new Works();