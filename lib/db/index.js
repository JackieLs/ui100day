var mysql  = require('mysql');  //调用MySQL模块
//创建一个connection
var DB = mysql.createConnection({    
	host     : '127.0.0.1',       //主机
	user     : 'root',    //MySQL认证用户名
	password :'',        //MySQL认证用户密码
	port	 : '3306',                  //端口号
	database :'test'
});

//创建一个connection
DB.connect(function(err){
	if(err){       
		console.log('[query] - :'+err);
		return;
	}
	console.log('[connection connect]  succeed!');
}); 

module.exports = DB;