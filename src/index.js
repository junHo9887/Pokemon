import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import rootReducer from './reducer';
import { BrowserRouter } from 'react-router-dom';
import {thunk} from 'redux-thunk'; // 수정: import 구문 수정

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();