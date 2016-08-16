import React from 'react';
import { render } from 'react-dom';
import { Route, IndexRoute, RouterContext, Redirect} from 'react-router';

/*Components*/


import App from './App.jsx';
import Rank from './controller/Rank.jsx';
import About from './controller/About.jsx';
import Login from './controller/Login.jsx';
import Resign from './controller/Resign.jsx';
import Square from './controller/Square.jsx';
import EveryUI from './controller/EveryUI.jsx';

import TopNav from './controller/topNav.jsx';

export default (
				<Route path="/bbbbb" component={App}>
					<Route path="/"  component={TopNav}>
						<IndexRoute component={Square} />
						<Route path="/everyui" component={EveryUI} />
						<Route path="/rank" component={Rank} />
						<Route path="/about" component={About} />
						<Route path="/account" component={About}>
							<Route path="detail"/>
						</Route>
					</Route>
					<Route path="/login" component={Login} />
					<Route path="/resign" component={Resign} />
				</Route>
				)