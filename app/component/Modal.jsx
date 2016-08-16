import React,{ Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

class Modal extends Component{
	render(){
		return (
			<div className="modal">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header"></div>
						<div className="modal-body"></div>
						<div className="modal-footer"></div>
					</div>
				</div>
			</div>
		)
	}
}
class ModalHeader extends Component{
	render(){
		return (
			<div className="modal-header">
				{this.props.children}
			</div>
		)
	}
}
class ModalBody extends Component{
	render(){
		return (
			<div className="modal-body">
				{this.props.children}
			</div>
		)
	}
}
class ModalFooter extends Component{
	render(){
		<div className="modal-footer">
			{this.props.children}
		</div>
	}
}
class ModalWrap extends Component{
	constructor(props){
		super(props);
		this.state = {
			modal:null,
		}
	}
	componentWillReceiveProps(nextProp){
		let {modalOpen} = nextProp;
		if(modalOpen){
			this.setState({
				modal:<Modal />
			})
		}
	}
	render(){
		let {modal} = this.state;
		return (
			<ReactCSSTransitionGroup transitionName="modal" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
				{modal}
			</ReactCSSTransitionGroup>
		)
	}
}

export default ModalWrap;