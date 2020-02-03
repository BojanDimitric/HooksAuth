import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Navigation = props => (
    <nav>
        {props.auth ? <Link to='/data'>Data</Link> : null}
        {props.auth ? <Link to='/form'>Form</Link> : null}
        {props.auth ? <Link to='/logout'>Logout</Link> : <Link to='/login'>Login</Link>}
    </nav>
);

const mapState = state => ({
    auth: state.auth.token !== null
});

export default connect(mapState)(Navigation);