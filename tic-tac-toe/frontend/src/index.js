import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './store/rootReducer';
import thunk from 'redux-thunk';
import {AIMiddleware} from './middleware/AIMiddleware';
import {settingsMiddleware} from './middleware/settingsMiddleware';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(
   thunk,
   AIMiddleware,
   settingsMiddleware

)));

// TODO добавить: ыв
//  -задержка перед ходом AI
//  +-подумать по поводу увеличения клеток
//  -обработку ошибок?
//  -авторизацию
//  -анимацию
//  -рефакторинг

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <App/>
         </BrowserRouter>
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();