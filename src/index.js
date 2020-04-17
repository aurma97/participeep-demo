import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker';
import {filmReducer} from './store/reducers/filmReducer';

const store = createStore(filmReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();