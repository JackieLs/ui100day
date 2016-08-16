import React, { Component, PropTypes } from 'react';

import { Button } from './form.jsx';

class Image extends Component{
	render(){
		let { pic } = this.props;
		return(
			<div className="work-image">
				<img src={ pic }/>
			</div>
			)
	}
}


class Info extends Component{
	render(){
		let { title, author, likes } = this.props;
		return (
			<div className="work-info">
				<div className="info-title text-14 text-left">{ title }</div>
				<div className="info-detail">
					<div className="pull-left">
						<img src={ author.avatar }/>
						<span className="text-12 color-grey">{ author.username }</span>
					</div>
					<div className="pull-right detail-likes">
						<span className="color-grey text-12"><span className="icon-favorite"></span>{likes}</span>
					</div>
					<div className="clearfix"></div>
				</div>
			</div>
			)
	}
}

class Work extends Component{
	render(){
		return(
			<li className="work-wrap text-center">
				<div>
					<Image {...this.props}/>
					<Info {...this.props} />
				</div>
			</li>
			)
	}
}
class WorkList extends Component{
	constructor(){
		super()
		this.state={
			worksData:{},
			tabListData:[
				{index:"suggest",text:"推荐"},
				{index:"newest",text:"最新"},
				{index:"follow",text:"我关注"}
			],
			tabIndex:"newest",
		}
	}
	componentWillMount(){
		var a = {
			title:"我的作品1",
			author:{
				avatar:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2296636211,1628881999&fm=116&gp=0.jpg",
				username:"Jack"
			},
			likes:10,
			pic:"/images/123.png"
		}
		var b = {
			title:"我的作品2",
			author:{
				avatar:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2296636211,1628881999&fm=116&gp=0.jpg",
				username:"Sellina"
			},
			likes:30,
			pic:"/images/123.png"
		}
		var c = {
			title:"我的作品3",
			author:{
				avatar:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2296636211,1628881999&fm=116&gp=0.jpg",
				username:"Sharby"
			},
			likes:120,
			pic:"/images/123.png"
		}
		var works_a = []
		var works_b = []
		var works_c = []
		for(let i=0;i<10;i++){
			works_a.push(a);
			works_b.push(b);
			works_c.push(c);
		}
		var worksData = {
			suggest:works_a,
			newest:works_b,
			follow:works_c
		}
		this.setState({
			worksData
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
		let { worksData, tabIndex, tabListData } = this.state;
		let works = worksData[tabIndex]||[];

		let workList = works.map((item, i)=>{
			return <Work key={i} {...item}/>
		})
		let tabList  = tabListData.map((item, i)=>{
			if(item.index==tabIndex){
				return <li className="color-blue text-14 pointer" key={i} onClick={ this.changeTab.bind(this) } data-index={ item.index }>{ item.text }</li>
			}
			return <li className="color-grey text-14 pointer" key={i} onClick={ this.changeTab.bind(this) } data-index={ item.index }>{ item.text }</li>
		})
		return (
			<div>
				<div className="public-tab-wrap">
					<ul className="tab public-tab">
						{tabList}
					</ul>
				</div>
				<ul className="flex-block works-ul">
					{ this.props.children }
					{workList}
					<div className="clearfix"></div>
				</ul>
			</div>)
	}
}
class TodayWork extends Component{
	render(){
		return (
			<div>
				<div className="public-tab-wrap today-work-title color-grey">UI100天 
					<Button className="btn btn-default" onClick={this.props.onClick}>
						<i className="icon-apps"></i>
						<span className="text">进度</span>
					</Button>
				</div>
				<div  className="today-work-wrap">
					<div className="today-work-info col-md-6">
						<div className="margin-bottome-30">
							<div className="text-24 color-grey margin-bottome-30">
								<span className="text-48 color-blue">13</span>天
							</div>
							<div className="text-30 color-dark-grey margin-bottome-30">信息图标</div>
							<div className="line bg-blue"></div>
						</div>
						<div>
							<p className="passage text-14">我们是由一群真正喜欢设计，懂设计的设计师在13年底建立的最有活力UI设计培训专业班。 我们坚信，在即将到来的移动互联网转型浪潮中，“设计元年”会很快到来，以视觉为导向的产品会越来越多的影响人们对于产品的整体体验。</p>
						</div>
						<div className="color-dark-grey designVedio">
							<span>|></span>
							<span>设计思路</span>
						</div>
						<div className="attach">
							<div className="text-12 attach-download" style={{color:"#bbbbbb"}}>附件下载</div>
							<div className="text-16" style={{color:"#7d7d7d"}}>参考图10张<span>&</span></div>
						</div>
					</div>
					<div className="col-md-6 ">
						<div className="today-work-upload">
							<img />
						</div>
					</div>
				</div>
				<div className="clearfix"></div>
			</div>
			)
	}
}
class TodayWorkList extends Component{
	render(){
		var data= [{a:1,b:2,pic:"/images/123.png"},{a:1,b:2,pic:"/images/123.png"},{a:1,b:2,pic:"/images/123.png"},{a:1,b:2,pic:"/images/123.png"},{a:1,b:2,pic:"/images/123.png"},{a:1,b:2,pic:"/images/123.png"}]
		let workList = data.map((item, i)=>{
			return <li className="work-wrap text-center" key={i}>
						<div>
							<Image {...item}/>
							<div className="today-work-item-title text-left text-14"><span className="color-grey">001</span> 404界面</div>
						</div>
					</li>
		})
		return <div>
				<div className="public-tab-wrap today-work-title color-grey">UI100天 
					<Button className="btn btn-default" onClick={this.props.onClick}>
						<i className="icon-keyboard_arrow_left"></i>
						<span className="text">返回</span>
					</Button>
				</div>
				<ul  className="flex-block today-work-list-ul">
					{workList}
				</ul>
				<div className="clearfix"></div>
			</div>
	}
}



export { Work, Info, Image, WorkList, TodayWork, TodayWorkList }