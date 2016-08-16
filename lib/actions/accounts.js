const excuteQuery = require('../db/excuteQuery');
// select username,count(*) as count from ui_user group by username having count>1; 好牛逼的句子

function Accounts(){}


Accounts.prototype.select = function(param, callback){
	var query = 'SELECT * FROM ui_user '+param
	excuteQuery(query, callback);
}


Accounts.prototype.insert = function(param, callback){
	var query = 'INSERT INTO ui_user '+ param;
	excuteQuery(query, callback);
}


Accounts.prototype.update = function(param, callback){
	var query = 'UPDATE ui_user SET '+ param;
	excuteQuery(query, callback);
}


Accounts.prototype.delete = function(param, callback){
	var query = 'DELETE FROM ui_user WHERE id="'+data.id+'"';
	excuteQuery(query, callback);
}

module.exports = new Accounts();

if(!module.parent){
	var a = new Accounts();
	a.select(null, function(err, res){
		console.log(err,res);
	});
}