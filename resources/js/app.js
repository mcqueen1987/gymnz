/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
require('./components/Example');

import ReactDOM from "react-dom";
import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {createBrowserHistory} from "history";
import {Router, Route, Link, Switch, Redirect} from "react-router-dom";
import {routes} from "./components/routes";

const hist = createBrowserHistory();

function App() {
    return (
        <Router history={hist}>
            <div style={{display: "flex"}}>
                <div>
                    <List className="nzg-side-nav">
                        <ListItem button><Link to="/">Home</Link></ListItem>
                        <ListItem button><Link to="/org">Organization</Link></ListItem>
                        <ListItem button><span onClick={LogoutFunc}>Logout</span></ListItem>
                    </List>
                </div>
                <div className="nzg-content">
                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        ))}
                        <Redirect to="/dashboard"/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);

