import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { auth } from '../Store';

const Authenticate = props => {
    const [ mail, setMail ] = useState('');
    const [ pass, setPass ] = useState('');
    const [ sign, setSign ] = useState(true);

    const onReset = () => {
        setMail('');
        setPass('');
    };

    const onSwitch = () => {
        setSign(!sign);
    };

    const onSubmit = e => {
        e.preventDefault();
        if (mail.trim() && pass.trim()) {
            props.auth(mail.trim(), pass.trim(), sign);
            onReset();
        };
    };

    let redirect = null;
    if (props.authenticated) {
        redirect = <Redirect to='/data' />;
    };

    return (
        <div>
            {redirect}
            <h3>{sign ? 'Signup' : 'Signin'}</h3>
            {props.loading ? <p>Loading!!!</p> : null}
            {props.error ? <p>{props.error.message}</p> : null}
            <form onSubmit={e => onSubmit(e)}>
                <label>Mail</label>
                <input value={mail} onChange={e => setMail(e.target.value)} placeholder='Your mail!' />
                <label>Pass</label>
                <input value={pass} onChange={e => setPass(e.target.value)} placeholder='Your pass!' />
                <button type='submit'>{sign ? 'Signup' : 'Signin'}</button>
            </form>
            <button onClick={() => onSwitch()}>Switch to {sign ? 'Signin' : 'Signup'}</button>
        </div>
    );
};

const mapState = state => ({
    authenticated: state.auth.token !== null,
    loading: state.auth.loading,
    error: state.auth.error
});

const mapDispatch = dispatch => ({
    auth: (mail, pass, sign) => dispatch(auth(mail, pass, sign))
});

export default connect(mapState, mapDispatch)(Authenticate);
