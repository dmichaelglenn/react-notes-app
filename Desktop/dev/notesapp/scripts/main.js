import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Navigation } from 'react-router';
import { createHistory } from 'history';

//components
import App from './components/App';
import NotFound from './components/NotFound';
import LoginScreen from './components/LoginScreen';

//routes
var routes = (
    <Router history={createHistory()}>
        <Route path="/" component={LoginScreen} />
        <Route path ="/book/:bookID" component={App} />
        <Route path="*" component={NotFound} />      
    </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));