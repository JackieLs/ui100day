import React,{ Component,PropTypes } from 'react';
import TopNav from './topNav.jsx';

import {LoginBoardInput, Button} from '../component/form.jsx';

import {userStore} from '../store';

class Resign extends Component{
	resign(){
		
		let { usernameRef, passwordRef, passwordRef2, emailRef } = this.refs;
		let username  = usernameRef.refs.input.value;
		let password  = passwordRef.refs.input.value;
		let password2 = passwordRef2.refs.input.value;
		let email     = emailRef.refs.input.value;
		if(password !== password2){
			return toastr.warning('两次输入的密码不一样');
		}
		var obj = {
			username,password,email
		}
		$.post('/accounts/resign',{data:JSON.stringify(obj)},(res)=>{
			if(!res.error){
				userStore.setDate(res.data, ()=>{
					this.context.router.push('/');
				})
			}else{
				toastr.warning(res.error);
			}
		})
	}
	login(){
		this.context.router.push('/login');
	}
	render(){
		return (
			<div className="login-wrapper">
				<div className="login-board">
					<div className="login-header text-center">
						<img src={BLACK_LOGO_URL}/>
						<span>Days UI</span>
						<span className="text-grey">欢迎加入!</span>
					</div>
					<div className="login-content">
						<div className="login-body">
							<LoginBoardInput ref="usernameRef" type="text" title="用户名或邮箱" placeholder="请输入用户名或邮箱"/>
							<LoginBoardInput ref="passwordRef" type="password" title="密码" placeholder="请输入密码"/>
							<LoginBoardInput ref="passwordRef2" type="password" title="确认密码" placeholder="请再次输入密码"/>
							<LoginBoardInput ref="emailRef" type="text" title="邮箱" placeholder="请输入邮箱"/>
						</div>
						<div className="login-footer">
							<Button className="btn" onClick={this.resign.bind(this)}>注册</Button>
							<div className="pull-right">
								<div className="text-12 color-grey"  style={{"marginTop":"18px"}}>已有账号？<span  className="text-12 color-blue pointer" onClick={this.login.bind(this)}>马上登录</span></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Resign;

Resign.contextTypes = {
	router:PropTypes.object.isRequired
}
