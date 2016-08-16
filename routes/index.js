var express = require('express');
var router = express.Router();

var WebRouter = require('./routerDetail');




/*账户系统*/
router.post('/accounts/resign',WebRouter.resign.bind(WebRouter));
router.post('/accounts/login',WebRouter.login.bind(WebRouter));
router.get('/accounts/logout',WebRouter.logout.bind(WebRouter));
router.put('/accounts/update',WebRouter.accountUpdate.bind(WebRouter));

/*验证登录*/
// router.all('/*', WebRouter.alidate.bind(WebRouter));
router.get('/accounts/user',WebRouter.user.bind(WebRouter));

/*题库系统*/
router.get('/subjects',WebRouter.getSubject.bind(WebRouter));

/*作品系统*/
router.post('/works',WebRouter.uploadWorks.bind(WebRouter));
router.get('/works',WebRouter.getWorks.bind(WebRouter));

/*评论系统*/
router.post('/comments/:workID',WebRouter.addComments.bind(WebRouter));
router.get('/comments/:workID',WebRouter.getComments.bind(WebRouter));
router.delete('/comments/:workID',WebRouter.deleteComments.bind(WebRouter));


router.get('/*',function(req, res){
	return res.render('index');
})

module.exports = router;