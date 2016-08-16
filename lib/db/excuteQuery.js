
const DB = require('./index');

module.exports = function(query, callback){
	DB.query(query, function(err, rows) {

		if (err) {
			console.log('[error] - query:'+err);
			return callback(err, null);
		}
		/*如果是select语句*/
		if(query.split(' ')[0].toLocaleLowerCase()=='select'){
			return callback(null, rows);
		}
		/*其余语句执行commit*/
		DB.query('COMMIT',function(error, result){
			if(error){
				console.log('[error] - commit:'+error);
				return callback(error, null);
			}else{
				return callback(null, rows)
			}
		})
	}); 
}