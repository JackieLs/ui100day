import React, {Component, PropTypes} from 'react';
import { IndexLink, Link } from 'react-router';

import ModalWrap from './component/Modal.jsx';
import {Button} from './component/form.jsx'

/*常量配置*/
const LOGO_URL = '/images/logo.png';


class Nav extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLogin:false,
			modalOpen:false
		}
	}
	componentWillMount(){
		/*请求验证是否登录，如果已登录则isLogged为true*/
		$.get('/accounts/user', function(reponse){
			console.log(reponse);
			if(reponse.data){
				this.setState({
					isLogin:true,
				})
			}
		})
	}
	login(){
		console.log(this)
		let {router} = this.context;
		router.push('/login')
	}
	render(){
		let {isLogin, modalOpen} = this.state;

		return (
			<div>
				<nav className="nav">
					<div className="logo pull-left">
						<img src={LOGO_URL} alt="LOGO" title="Ui100Day" />
					</div>
					<ul className="nav-tabs pull-left">
						<li><Link to="/everyui"activeClassName="active">每日UI</Link></li>
						<li><IndexLink to="/" activeClassName="active">广场</IndexLink></li>
						<li><Link to="/rank" activeClassName="active">排行榜</Link></li>
						<li><Link to="/about" activeClassName="active">关于我们</Link></li>
					</ul>
					<div className="login pull-right">
					<Button onClick={this.login.bind(this)}>登录</Button>
					</div>
					<div className="clearfix"></div>
				</nav>
				<div className="clearfix"></div>
				{this.props.children}
			</div>
			)
	}
}

export default Nav;

Nav.contextTypes = {
	router: PropTypes.object.isRequired
}