import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import reducers from './reducers';

const store = createStore(reducers,loadFromLocalStorage(), applyMiddleware(thunk));
store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.querySelector('#root')
);

// convert object to string and store in localStorage
function saveToLocalStorage(state:any) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}
// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

// OLD CODE. WITHOUT LOCALSTORAGE
// import React from 'react';
// import ReactDOM from 'react-dom';

// import { Provider } from 'react-redux';
// import {
//   applyMiddleware,
//   createStore,
// } from 'redux';
// import thunk from 'redux-thunk';

// import App from './App';
// import reducers from './reducers';

// const store = createStore(reducers, applyMiddleware(thunk));

// ReactDOM.render(
//     <Provider store={store}>
//         <App/>
//     </Provider>
//     , document.querySelector('#root')
// );

// trying to implement local storage:
// src: https://dev.to/link2twenty/react-redux-and-localstorage-2lih