import React,{ Component,PropTypes } from 'react';


class SquareCommentList extends Component{
	constructor(){
		super();
		this.state = {
			tabIndex:'newest',
			tabListData:[
				{index:"suggest",text:"推荐点评"},
				{index:"newest",text:"最新点评"}
			],
			commentData:{}
		}
	}
	componentWillMount(){
		var a = {
			author:{
				avatar:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2296636211,1628881999&fm=116&gp=0.jpg",
				username:"Jack"
			},
			date:'2016-1-2',
			comment:"追技术的；奥法",
			pic:"/images/123.png"
		}
		var b = {
			author:{
				avatar:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2296636211,1628881999&fm=116&gp=0.jpg",
				username:"Sellina"
			},
			comment:"大健康；管理 ",
			date:'2016-32131-21',
			pic:"/images/123.png"
		}
		var works_a = []
		var works_b = []
		for(let i=0;i<10;i++){
			works_a.push(a);
			works_b.push(b);
		}
		var commentData = {
			suggest:works_a,
			newest:works_b
		}
		this.setState({
			commentData
		})
	}
	changeTab(e){
		let tabIndex = e.target.dataset.index || e.target.getAttribute('data-index');/*兼容*/
		/*set tabIndex*/
		this.setState({
			tabIndex
		})
	}
	render(){
		let { tabIndex, tabListData, commentData } = this.state;
		let comments = commentData[tabIndex];

		let commentList = comments.map((item, i)=>{
			return <SquareComment key={i} {...item} />
		})
		let tabList = tabListData.map((item, i)=>{
			if(item.index == tabIndex){
				return <li key={i} className="color-blue pointer" onClick={ this.changeTab.bind(this) }  data-index={ item.index }>{item.text}</li>
			}else{
				return <li key={i} className="color-grey pointer" onClick={ this.changeTab.bind(this) }  data-index={ item.index }>{item.text}</li>
			}
		})
		return (<div className="pull-left col-md-7">
					<div className="square-module-title col-md-3">
						<ul className="tab color-grey square-comments-tabs-ul">
							{tabList}
						</ul>
					</div>
					<div className="clearfix"></div>
					<ul className="square-comments-ul">
						{commentList}
					</ul>
				</div>)
	}
}
class SquareComment extends Component{
	render(){
		return (
			<li>
				<div>
					<div className="pull-left col-md-3 text-center square-comments-img">
						<img src={this.props.pic} />
					</div>
					<div className="pull-right col-md-9 square-comments-content">
						<div className="comment-author">
							<img src={ this.props.author.avatar }/>
							<span className="text-12 color-grey">{ this.props.username }</span>
						</div>
						<div className="comment-detail">
							<p className="text-14">{ this.props.comment }</p>
						</div>
						<div className="comment-date text-12">
							{ this.props.date }
						</div>
					</div>
					<div className="clearfix"></div>
				</div>
			</li>

		)
	}
}

export { SquareCommentList }