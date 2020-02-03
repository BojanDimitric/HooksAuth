import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { authAutoLogin } from './Store';

import Navigation from './Components/Navigation';
import Authenticate from './Components/Authenticate';
import Logout from './Components/Logout';
import Data from './Components/Data';
import Form from './Components/Form';

const App = props => {
	useEffect(() => props.authAutoLogin(), []);

	let routes = (
		<Switch>
			<Route path='/' exact component={Authenticate} />
			<Route path='/auth' component={Authenticate} />
			<Redirect to='/' />
		</Switch>
	);
	
	if (props.authenticated) {
		routes = (
			<Switch>
				<Route path='/logout' component={Logout} />
				<Route path='/data' component={Data} />
				<Route path='/form' component={Form} />
				<Redirect to='/data' />
			</Switch>
		);
	};

	return (
		<div>
			<Navigation />
			{routes}
		</div>
	);
};

const mapState = state => ({
	authenticated: state.auth.token !== null
});

const mapDispatch = dispatch => ({
	authAutoLogin: () => dispatch(authAutoLogin())
});

export default connect(mapState, mapDispatch)(App);
