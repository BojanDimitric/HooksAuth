import axios from 'axios';

import * as actionTypes from '../actionTypes';

const authStart = () => ({
    type: actionTypes.AUTH_START
});

const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
});

const authFail = error => ({
    type: actionTypes.AUTH_FAIL,
    error
});

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

const authTimeout = timeout => {
    return dispatch => {
        setTimeout(() => dispatch(authLogout()), timeout);
    }
};

export const auth = (mail, pass, sign) => {
    return dispatch => {
        dispatch(authStart());
        const auth = {
            email: mail,
            password: pass,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPiit2Yfor80gff-bpzpICbbKdTOUtyBo';
        if (!sign) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPiit2Yfor80gff-bpzpICbbKdTOUtyBo';
        };
        axios.post(url, auth)
            .then(res => {
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(authTimeout(res.data.expiresIn * 1000));
            })
            .catch(err => dispatch(authFail(err.response.data)));
    };
};

export const authAutoLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(authTimeout(expirationDate.getTime() - new Date().getTime()));
            };
        };
    };
};