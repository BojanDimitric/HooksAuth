import React, { useState } from 'react';
import { connect } from 'react-redux';

import { postData } from '../Store';

import './Form.css';

const Form = props => {
    const [ input, setInput ] = useState('');
    const [ touched, setTouched] = useState(false);
    const [ formIsValid, setFormIsValid ] = useState(false);

    const onReset = () => {
        setInput('');
    };

    const checkValidity = (value, rules) => {
        let isValid = true;
        
        for (let key in rules) {
            if (key === 'required') {
                isValid = value.trim() !== '' && isValid;
            };
            if (key === 'minLength') {
                isValid = value.length >= rules[key] && isValid
            };
            if (key === 'maxLength') {
                isValid = value.length <= rules[key] && isValid
            };
            if (key === 'isEmail') {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid
            };
            if (key === 'isNumeric') {
                const pattern = /^\d+$/;
                isValid = pattern.test(value) && isValid
            };
        };

        return isValid;
    };

    const onSubmit = e => {
        e.preventDefault();
        if (checkValidity(input.trim(), { required: true, minLength: 7, maxLength: 20 }) & formIsValid) {
            const data = {
                userId: props.userId,
                data: input.trim()
            };
            props.postData(props.token, data);
            onReset();
        };
    };

    return (
        <div>
            <h3>Form</h3>
            {props.loading ? <p>Loading!!!</p> : null}
            {props.error ? <p>{props.error.message}</p> : null}
            <form onSubmit={e => onSubmit(e)}>
                <label>Data</label>
                <input 
                    className={(!touched || checkValidity(input.trim(), { required: true, minLength: 7, maxLength: 20 })) ? '' : 'red'}
                    value={input} 
                    onChange={e => { setInput(e.target.value); setTouched(true); setFormIsValid(checkValidity(input.trim(), { required: true, minLength: 7, maxLength: 20 }))}} 
                    placeholder='Your data!' 
                />
                <button type='submit' disabled={!formIsValid}>Submit</button>
            </form>
        </div>
    );
};

const mapState = state => ({
    loading: state.data.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.data.error
});

const mapDispatch = dispatch => ({
    postData: (token, data) => dispatch(postData(token, data))
});

export default connect(mapState, mapDispatch)(Form);