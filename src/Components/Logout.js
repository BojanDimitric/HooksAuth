import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { authLogout } from '../Store';

const Logout = props => {
    useEffect(() => props.authLogout(), []);

    return (<Redirect to='/' />);
};

const mapDispatch = dispatch => ({
    authLogout: () => dispatch(authLogout())
});

export default connect(null, mapDispatch)(Logout);