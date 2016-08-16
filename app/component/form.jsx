import React,{ Component, PropTypes } from 'react';

class Button extends Component{
	render(){
		return <button className={this.props.className||"btn btn-default"} onClick={this.props.onClick}>{this.props.children}</button>
	}
}
Button.propTypes = {
	onClick:PropTypes.func.isRequired,
	className:PropTypes.string
}



class LoginBoardInput extends Component{
	render(){
		return (
			<div className="input-wrap">
				<div className="input-title">
					{this.props.title}
				</div>
				<div className="input-value">
					<input ref="input" {...this.props}/>
				</div>
			</div>
		)
	}
}

export {Button, LoginBoardInput}