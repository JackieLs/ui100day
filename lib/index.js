'use strict'
const MODULE_MAP = {
	'work':require('./actions/works'),
	'account':require('./actions/accounts'),
	'subject':require('./actions/subjects'),
	'comment':require('./actions/comments')
}
const crypto = require('crypto');


/*公共函数*/
function MD5(content){
	if(!!content){
		var md5 = crypto.createHash('md5');
		md5.update(content);
		return md5.digest('hex');
	}else{
		return '';
	}
}

/*本模块验证数据正确性，并对返回数据进行格式化*/
function Validation(){}

/*所有的update都必须提供id字段用来查找*/

/*注册:
@param data:{username,password,email,regip,lastip}
*/
Validation.prototype.resign = function(data, callback){

	if(!(data&&data.username&&data.password&&data.email&&data.regip&&data.lastip)){
		return callback("缺少参数", null);
	}

	var query = formatInserQuery(data);

	MODULE_MAP['account'].insert(query, function(err, res){
		if(err){
			if(err.errno==1062){
				callback('已存在该用户', null);
			}else{
				callback('未知错误:'+err.errno, null);
			}
		}else{
			let query = 'where username="';
			query += data.username+'"';
			MODULE_MAP['account'].select(query, function(err, res){
				if(err){
					callback(err, null)
				}else{
					if(!!res.length){
						delete res[0].password;
						delete res[0].passchanged;
						callback(null, res[0]);
					}else{
						callback('不存在用户', null);
					}
					
				}
			});
		}
	});
}
/*登录
@param data:{username,password}
*/
Validation.prototype.login = function(data, callback){
	if(!(data&&data.username&&data.password)){
		return callback("缺少参数", null);
	}
	let query = 'where username="';
	query += data.username+'"';

	MODULE_MAP['account'].select(query, function(err, res){
		if(err){
			callback(err, null)
		}else{
			if(!!res.length){
				let md5Pass = MD5(data.password);
				let dataPass = res[0]&&res[0].password + '';

				if( md5Pass != dataPass){
					callback('密码错误', null);
				}else{
					delete res[0].password;
					delete res[0].passchanged;
					callback(null, res[0]);
				}
			}else{
				callback('不存在用户', null);
			}
			
		}
	});
}
/*修改账户信息
password,sex,avatar,description,views,likes,follows,works
*/
Validation.prototype.accountUpdate = function(data, callback){
	if(!data||!data.id){
		return callback("缺少参数", null);
	}
	if(data.username){
		return callback("非法参数", null);
	}
	var query = formatUpdateQuery(data);
	MODULE_MAP['account'].update(query, function(err, res){
		callback(err, res);
	});
}
/*上传作品
id:该work的唯一标识,typeid:第几天的任务,userid:谁完成的,pic:作品地址,orderid?,likes:点赞,favorites:收藏,ctime:?uptime:?
注意这里时间为秒
*/

Validation.prototype.uploadWorks = function(data, callback){
	if(!(data&&data.typeid)){
		return callback('缺少参数', null)
	}
	data.uptime = new Date().getTime();

	var query = formatInserQuery(data);

	MODULE_MAP['work'].insert(query, function(err, res){
		callback(err, res)
	});
}
Validation.prototype.getWorks = function(data, callback){

	var query = '';

	var type = data.type;
	var page = data.page<=0? 0:data.page;
	var limit = data.limit||10;

	switch(type){
		case 'latest':
			query = 'order by uptime desc limit '+(page-1)*limit+','+limit;
			console.log(query)
			MODULE_MAP['work'].select(query, function(err, res){
				callback(err, res)
			});
			break;
		case 'recommend':
			break;
		case 'favourite':
			break;
	}
}

function formatInserQuery(data){
	let query = '';
	let key    = '(';
	let tmpStr = ') VALUES ('
	let value  = '';

	let cloneData = JSON.parse(JSON.stringify(data));
	if(data.password){
		cloneData.password = MD5(data.password);
	}
	for(let i in cloneData){
		key += (i+',');
		value += ('"'+cloneData[i]+'",');
	}

	key = key.slice(0,key.length-1);
	value = value.slice(0,value.length-1)+')';
	query = key+tmpStr+value;
	return query;
}
function formatUpdateQuery(data){
	var query = '';
	var id    = data.id;
	delete data.id;

	for(i in data){
		query+= (i + '="' + data[i] + '",');
	}

	query = query.slice(0,query.length-1);
	query += ' where id="'+id+'"';
	return query;
}

module.exports = new Validation();
if(!module.parent){
	var a = new Validation();
	a.getWorks({
		type:'latest',
		page:1,
		limit:3
	},function(err, res){
		console.log(err, JSON.stringify(res));
	})
}