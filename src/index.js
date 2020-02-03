import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';

import authReducer from './Store/reducers/auth';
import dataReducer from './Store/reducers/data';

import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
