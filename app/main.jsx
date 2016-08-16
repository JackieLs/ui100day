import React from 'react';
import { Router, browserHistory } from 'react-router';

import { render } from 'react-dom';
import route from './route.jsx';

render(
	<Router history={browserHistory}>{route}</Router>
	, document.getElementById('root')
)