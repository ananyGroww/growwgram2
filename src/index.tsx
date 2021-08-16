import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import lscache from 'lscache';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import reducers from './store/reducers';

const store = createStore(reducers,loadFromLocalStorage(), applyMiddleware(thunk));
store.subscribe( () => saveToLocalStorage( store.getState() ) );

ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
                <App/>
        </Provider>
    </BrowserRouter>
    , document.querySelector('#root')
);
// Trying using lscache
function saveToLocalStorage(state:any) {
    try {
        const serialisedState = JSON.stringify(state);
        // localStorage.setItem("persistantState", serialisedState);
        lscache.set('ReduxState', serialisedState, 1); // 1 minute life of cache
    } catch (e) {
        console.warn(e);
    }
}
// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
    try {
        // const serialisedState = localStorage.getItem("persistantState");
        const serialisedState = lscache.get('ReduxState');
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

// convert object to string and store in localStorage
// function saveToLocalStorage(state:any) {
//     try {
//         const serialisedState = JSON.stringify(state);
//         localStorage.setItem("persistantState", serialisedState);
//     } catch (e) {
//         console.warn(e);
//     }
// }
// // load string from localStarage and convert into an Object
// // invalid output must be undefined
// function loadFromLocalStorage() {
//     try {
//         const serialisedState = localStorage.getItem("persistantState");
//         if (serialisedState === null) return undefined;
//         return JSON.parse(serialisedState);
//     } catch (e) {
//         console.warn(e);
//         return undefined;
//     }
// }