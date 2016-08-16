import React,{ Component,PropTypes } from 'react';
import TopNav from './topNav.jsx';

import {LoginBoardInput, Button} from '../component/form.jsx';

import {userStore} from '../store';

class Login extends Component{
	login(){
		let {usernameRef, passwordRef} = this.refs;
		let username = usernameRef.refs.input.value;
		let password = passwordRef.refs.input.value;
		let obj = {
			username,password
		}
		$.post('/accounts/login',{data:JSON.stringify(obj)},(res)=>{
			if(!res.error){
				userStore.setDate(res.data, ()=>{
					this.context.router.push('/');
				})
			}
		})
	}
	forget(){

	}
	resign(){
		this.context.router.push('/resign');
	}
	render(){
		return (
			<div className="login-wrapper">
				<div className="login-board">
					<div className="login-header text-center">
						<img src={BLACK_LOGO_URL}/>
						<span>Days UI</span>
						<span className="text-grey">欢迎回来!</span>
					</div>
					<div className="login-content">
						<div className="login-body">
							<LoginBoardInput ref="usernameRef" type="text" title="用户名或邮箱" placeholder="请输入用户名或邮箱"/>
							<LoginBoardInput ref="passwordRef" type="password" title="密码" placeholder="请输入密码"/>
						</div>
						<div className="login-footer">
							<Button className="btn" onClick={this.login.bind(this)}>登录</Button>
							<div className="pull-right">
								<div className="text-12 color-grey forget-password text-right" onClick={this.forget.bind(this)}>忘记密码?</div>
								<div className="text-12 color-grey">还没有账号？<span className="text-12 color-blue pointer" onClick={this.resign.bind(this)}>马上注册</span></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login;

Login.contextTypes = {
	router:PropTypes.object.isRequired
}
