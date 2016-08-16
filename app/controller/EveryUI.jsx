import React,{ Component,PropTypes } from 'react';

import TopNav from './topNav.jsx';
import { WorkList, TodayWork, TodayWorkList } from '../component/work.jsx';

import { userStore } from '../store';

class EveryUI extends Component{
	constructor(){
		super();
		let { isLogin, userInfo } = userStore.getDate();
		this.state = {
			isLogin,
			userInfo,
			todayDetail:true
		}
	}
	componentWillMount(){
		let { userInfo, isLogin } = this.state;
		if(!isLogin){
			$.get('/accounts/user', reponse=>{
				let { data } = reponse;
				userStore.setDate(data, ()=>{
					/*data要么有数据要么就是null*/
					let { isLogin, userInfo } = userStore.getDate();
					this.setState({
						isLogin,
						userInfo
					})
				})
			})
		}else{
			if(!userInfo){
				this.context.router.push('/');
			}
		}
	}
	handleClick(){
		let { todayDetail } = this.state;
		this.setState({
			todayDetail:!todayDetail
		})
	}
	render(){
		let { userInfo, isLogin, todayDetail } = this.state;
		if(todayDetail){
			return (
				<div className="every-ui-wrap">
					<TodayWork onClick={this.handleClick.bind(this)}/>
					<WorkList />
				</div>)
		}else{
			return (
				<div className="every-ui-wrap">
					<TodayWorkList onClick={this.handleClick.bind(this)} />
				</div>)
		}
	}
}

export default EveryUI;

EveryUI.contextTypes = {
	router:PropTypes.object.isRequired
}

