const excuteQuery = require('../db/excuteQuery');
function Comments(){}

// pid对应作品id
// cmid
// id?都是什么
// uid对应评论者id

/*GET:/comments*/
Comments.prototype.select = function(data, callback){
	var query = 'SELECT * FROM ui_comment WHERE pid="wqelsysk"'
	excuteQuery(query, callback);
}

/*POST:/comments*/
Comments.prototype.insert = function(data, callback){
	var query = 'INSERT INTO ui_comment (username,password,email,regip,lastip) VALUES ("'+data.username+'","'+data.password+'","'+data.email+'","'+data.regip+'","'+data.lastip+'")';
	excuteQuery(query, callback);
}


/*PUT:/comments*/
Comments.prototype.update = function(data, callback){}


/*DELETE:/comments*/
Comments.prototype.delete = function(data, callback){
	var query = 'DELETE FROM ui_comment WHERE id="'+data.id+'"';
	excuteQuery(query, callback);
}

module.exports = new Comments();

if(!module.parent){
	var a = new Comments();
	a.select(null, function(err, res){
		console.log(err,res);
	});
}