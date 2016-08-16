

class UserStore {
	constructor(){
		this.data = {
			userInfo:null,
			isLogin:false
		}
	}
	getDate(){
		return this.data;
	}
	setDate(data, callback){
		this.data = {
			userInfo:data,
			isLogin:true
		};
		callback();
	}
}


export default new UserStore()