import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getData } from '../Store';

import Item from './Item';

const Data = props => {
    useEffect(() => props.getData(props.token, props.userId), []);

    return (
        <div>
            <h3>Data</h3>
            {props.loading ? <p>Loading!!!</p> : null}
            {props.error ? <p>{props.error.message}</p> : null}
            <ul>
                {props.data ? props.data.map((item, i) => <Item key={i} data={item.data} />) : null}
            </ul>
        </div>
    );
};

const mapState = state => ({
    token: state.auth.token,
    userId: state.auth.userId,
    loading: state.data.loading,
    data: state.data.data,
    error: state.data.error
});

const mapDispatch = dispatch => ({
    getData: (token, userId) => dispatch(getData(token, userId))
});

export default connect(mapState, mapDispatch)(Data);
