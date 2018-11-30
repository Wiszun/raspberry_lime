import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import uiReducer from './store/reducers/UIReducer'
import authReducer from './store/reducers/authReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (<Provider store={store}>
              <Router>
                <App/>
              </Router>
            </Provider>)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
