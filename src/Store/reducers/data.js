import * as actionTypes from '../actionTypes';

const inititaState = {
    loading: false,
    data: null,
    error: null
};

const dataReducer = (state = inititaState, action) => {
    switch (action.type) {
        case actionTypes.GET_DATA_START: 
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_DATA_SUCCESS: 
            return {
                ...state,
                loading: false,
                data: action.data,
                error: null
            };
        case actionTypes.GET_DATA_FAIL: 
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.POST_DATA_START: 
            return {
                ...state,
                loading: true
            };
        case actionTypes.POST_DATA_SUCCESS: 
            return {
                ...state,
                loading: false,
                error: null
            };
        case actionTypes.POST_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default: 
            return state;
    };
};

export default dataReducer;