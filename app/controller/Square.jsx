import React,{ Component,PropTypes } from 'react';

import { Button } from '../component/form.jsx';
import { WorkList } from '../component/work.jsx';
import { SquareCommentList } from '../component/Comment.jsx';

import { userStore } from '../store';


class Square extends Component{
	constructor(){
		super();
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
	resign(){
		this.context.router.push('/resign')
	}
	render(){
		let { userInfo, isLogin } = this.state;

		let logOutBanner = (<span></span>);
		let logInBanner  = (<span></span>);

		if(isLogin){
			if(!userInfo){
				logOutBanner = (
						<div className="square-banner-wrap">
							<div className="square-banner">
								<div className="text-center vertical-middle">
									<div className="color-white way-to-god">通往大神之路</div>
									<Button className="btn bg-blue color-white" onClick={this.resign.bind(this)}>注册</Button>
								</div>
							</div>
						</div>)
			}else{
				logInBanner = (
						<div className="square-login-banner">
							<img src="/images/square-banner2.png"/>
						</div>)
			}
		}
		return (
			<div className="square-wrap">
				{ logOutBanner }
				<WorkList>
					{ logInBanner }
				</WorkList>
				<div className="square-comments-wrap">
					<div className="flex-block">
						<SquareCommentList />
						<SquareDesignerList />
						<div className="clearfix"></div>
					</div>
				</div>
			</div>
		)
	}
}


class SquareDesignerList extends Component{
	constructor(){
		super();
		this.state={
			designerData:[]
		}
	}
	componentWillMount(){
		var b = {
			author:{
				avatar:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2296636211,1628881999&fm=116&gp=0.jpg",
				username:"Sellina"
			}
		}
		var designerData = []
		for(let i=0;i<10;i++){
			designerData.push(b);
		}
		this.setState({
			designerData
		})
	}
	render(){
		let { designerData } = this.state;

		let designerDataList = designerData.map((item, i)=>{
			return <Designer key={i} {...item}/>
		})
		return (<div className="pull-right col-md-5">
					<div className="color-grey square-module-title">
						活跃设计师
					</div>
					<ul className="tab square-designer-ul">
						{ designerDataList }
					</ul>
				</div>)
	}
}
class Designer extends Component{
	render(){
		return <li><img src={this.props.author.avatar} /></li>
	}
}
export default Square;

Square.contextTypes = {
	router:PropTypes.object.isRequired
}