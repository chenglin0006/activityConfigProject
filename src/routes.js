import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './app/login/index';
import Home from './app/home/index';

export default () => {
	return (
		<Router>			
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/" component={Home} />				
			</Switch>
		</Router>
	);
}