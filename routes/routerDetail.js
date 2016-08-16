const validateParam = require('../lib');
const querystring = require('querystring');

const requestIP = function(req){
	var a = req.headers['x-real-ip']||req.headers['x-forwarded-for']||req.connection.remoteAddress;
	return /\d+\.\d+\.\d+\.\d+/.exec(a)[0]
}

function WebRouter(){}

/*每次路由都会验证一下*/
WebRouter.prototype.validatev = function(req, res, next) {
	var userStr = new Buffer(req.signedCookies.user || "", 'base64').toString();
	if (userStr) {
		var userInfo = null;
		try {
			userInfo = JSON.parse(userStr);
		}catch (e) {
			return res.render("index");
		}
	} else {
		return res.render("index");
	}
	next();
};
/*获取当前登录用户*/
WebRouter.prototype.user = function(req, res) {
	// console.log(req.connection.socket.remoteAddress);
	var userStr = new Buffer(req.signedCookies.userInfo || "", 'base64').toString();
	var userInfo = null;

	if (userStr) {
		try {
			userInfo = JSON.parse(userStr);
			
		}catch (e) {
			return res.json({error:"JSON parse error", data: null});
		}
		return res.json({error:null, data: userInfo});
	} else {
		return res.json({error:null, data: userInfo});
	}
	
	// next();
};
/*账户系统*/
WebRouter.prototype.resign = function(req, res){
	var ip = requestIP(req);
	try{
		var accountInfo = JSON.parse(req.body.data);
	}catch(e){
		return  res.json({
					error:"ACCOUNT JSON PARSE ERROR",
					data:null
				});
	}
	accountInfo['regip']  = ip;
	accountInfo['lastip'] = ip;
	validateParam.resign(accountInfo, function(error, data){
		var userInfo = new Buffer(JSON.stringify(data)).toString('base64');
		res.cookie('userInfo', userInfo, {
			expires: new Date(+Date.now() + (1000 * 60 * 60 * 24 * 7)),
			path: '/',
			httpOnly: true,
			signed: true
		});
		return res.json({
					error:error,
					data:data
				})
	})
}
WebRouter.prototype.logout = function(req, res){
	res.clearCookie('userInfo',{
		path:'/'
	});
	res.redirect('/')
}
WebRouter.prototype.login = function(req, res){
	try{
		var accountInfo = JSON.parse(req.body.data);
	}catch(e){
		return  res.json({
					error:"ACCOUNT JSON PARSE ERROR",
					data:null
				});
	}
	validateParam.login(accountInfo, function(error, data){
		var userInfo = new Buffer(JSON.stringify(data)).toString('base64');
		res.cookie('userInfo', userInfo, {
			expires: new Date(+Date.now() + (1000 * 60 * 60 * 24 * 7)),
			path: '/',
			httpOnly: true,
			signed: true
		});
		return res.json({
			error:error,
			data:data
		})
	})
}

WebRouter.prototype.accountUpdate = function(req, res){
	try{
		var accountInfo = JSON.parse(req.body.data);
	}catch(e){
		return  res.json({
					error:"ACCOUNT JSON PARSE ERROR",
					data:null
				});
	}
	validateParam.accountUpdate(accountInfo, function(error, data){
		res.json({
			error:error,
			data:data
		})
	})
}

/*题库系统*/
WebRouter.prototype.getSubject = function(req, res){}

/*作品系统*/
WebRouter.prototype.uploadWorks = function(req, res){
	try{
		var workInfo = JSON.parse(req.body.data);
	}catch(e){
		return  res.json({
					error:"ACCOUNT JSON PARSE ERROR",
					data:null
				});
	}
	validateParam.uploadWorks(workInfo, function(error, data){
		res.json({
			error:error,
			data:data
		})
	})
}
WebRouter.prototype.getWorks = function(req, res){
	var query = querystring.parse(req.query);	
	validateParam.getWorks(query, function(error, data){
		res.json({
			error:error,
			data:data
		})
	})
}

/*评论系统*/
WebRouter.prototype.addComments = function(req, res){
	
}
WebRouter.prototype.getComments = function(req, res){
	
}
WebRouter.prototype.deleteComments = function(req, res){
	
}

module.exports = new WebRouter();