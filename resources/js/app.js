/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
require('./bootstrap');

import React from "react";
import {createBrowserHistory} from "history";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import ReactDOM from "react-dom";

// core components
import Admin from "./layouts/Admin.jsx";
import RTL from "./layouts/RTL.jsx";

import "./assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/admin" component={Admin}/>
            <Route path="/rtl" component={RTL}/>
            <Redirect from="/" to="/admin/dashboard"/>
        </Switch>
    </Router>,
    document.getElementById("app")
);
