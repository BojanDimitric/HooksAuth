import axios from 'axios';

import * as actionTypes from '../actionTypes';

const getDataStart = () => ({
    type: actionTypes.GET_DATA_START
});

const getDataSuccess = data => ({
    type: actionTypes.GET_DATA_SUCCESS,
    data
});

const getDataFail = error => ({
    type: actionTypes.GET_DATA_FAIL,
    error
});

export const getData = (token, userId) => {
    return dispatch => {
        dispatch(getDataStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://authentication-7456f.firebaseio.com/data.json' + queryParams)
            .then(res => {
                const data = [];
                for (let key in res.data) {
                    data.push(res.data[key]);
                };
                dispatch(getDataSuccess(data));
            })
            .catch(err => dispatch(getDataFail(err.response.data)));
    };
};

const postDataStart = () => ({
    type: actionTypes.POST_DATA_START
});

const postDataSuccess = () => ({
    type: actionTypes.POST_DATA_SUCCESS
});

const postDataFail = error => ({
    type: actionTypes.POST_DATA_FAIL,
    error
});

export const postData = (token, data) => {
    return dispatch => {
        dispatch(postDataStart());
        const queryParams = '?auth=' + token;
        axios.post('https://authentication-7456f.firebaseio.com/data.json' + queryParams, data)
            .then(res => dispatch(postDataSuccess()))
            .catch(err => dispatch(postDataFail(err.response.data)));
    };
};