import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { IndexLink, Link } from 'react-router';

import {Button} from '../component/form.jsx'

import {userStore} from '../store';


class TopNav extends Component{
	constructor(props){
		super(props);
		let { isLogin, userInfo } = userStore.getDate();
		this.state = {
			isLogin,
			userInfo
		}
	}
	componentWillMount(){
		if(!this.state.isLogin){
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
		}
	}
	login(){
		let {router} = this.context;
		router.push('/login')
	}
	showUserCenterList(){
		this.setState({userCenterList:true})
	}
	hideUserCenterList(){
		this.setState({userCenterList:false})
	}
	render(){
		
		let { isLogin, userInfo, userCenterList } = this.state;
		let username = userInfo? userInfo.username:'';
		let userPlace = [];
		if(isLogin){
			if(!!userInfo){
				userPlace = (<div className="logged-info pull-right">
								<span className="logged-message">
									<img src={ NORMAL_BELL } title="通知"/>
								</span>
								<div style={{"display":"inline-block",
											"width":"100px",
											"height":"300px","textAlign":"right"}} onMouseLeave={ this.hideUserCenterList.bind(this) } >
									<span className="logged-header" onMouseEnter={ this.showUserCenterList.bind(this) } >
										<img src={ userInfo.avatar||"http://img.ui100day.com/old20160119/569e00d550d2f.png" } />
									</span>
									<Usercenter 
										show={ userCenterList } 
										username={ username }
									/>
								</div>
							</div>)
			}else{
				userPlace = (<div className="login-btn pull-right">
								<Button onClick={ this.login.bind(this) }>登录</Button>
							</div>)
			}
		}

		return (
			<div>
				<nav className="nav">
					<div className="logo pull-left">
						<img src={WHITE_LOGO_URL} alt="LOGO" title="Ui100Day" />
					</div>
					<ul className="nav-tabs pull-left">
						<li><Link to="/everyui"activeClassName="active">每日UI</Link></li>
						<li><IndexLink to="/" activeClassName="active">广场</IndexLink></li>
						<li><Link to="/rank" activeClassName="active">排行榜</Link></li>
						<li><Link to="/about" activeClassName="active">关于我们</Link></li>
					</ul>
					{userPlace}
					<div className="clearfix"></div>
				</nav>
				<div className="clearfix"></div>
				{this.props.children}
			</div>
			)
	}
}
class Usercenter extends Component{
	render(){
		let { show, username } = this.props;
		let listItems = [{
			pathname:'/a',
			query:{},
			text:username
		},{
			pathname:'/a',
			query:{},
			text:'我关注的'
		},{
			pathname:'/a',
			query:{},
			text:'我的收藏'
		},{
			pathname:'/a',
			query:{},
			text:'修改资料'
		},{
			pathname:'/a',
			query:{},
			text:'VIP会员'
		},{
			pathname:'/accounts/logout',
			query:{},
			text:'退出登录'
		}]
		let listItem = listItems.map((item, i)=>{
			return	<li key={i}>
						<Link to={
							{
								pathname:item.pathname,
								query:item.query
							}
						}>{item.text}</Link>
					</li>
		});

		let list =  show?  (<ul className="text-12" onMouseLeave={ this.props.onMouseLeave }>
							{listItem}
							</ul>):null;
		return (
			<ReactCSSTransitionGroup transitionName="modal" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
				{ list }
			</ReactCSSTransitionGroup>)
	}
}

export default TopNav;

TopNav.contextTypes = {
	router: PropTypes.object.isRequired
}