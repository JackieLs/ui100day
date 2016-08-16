import React, {Component, PropTypes} from 'react';
import { IndexLink, Link } from 'react-router';

import ModalWrap from './component/Modal.jsx';
import {Button} from './component/form.jsx'

/*常量配置*/
const LOGO_URL = '/images/logo.png';


class App extends Component{
	render(){
		return (
			<div className="wrap">
				{this.props.children}
			</div>
		)
	}
}
export default App;
