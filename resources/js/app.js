import ReactDOM from "react-dom";
import React from "react";
import Example from "./components/Example";

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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class App extends React.Component {
    render() {
        return (
            <div className="nzg-container">
                <List className="nzg-side-nav">
                    <ListItem>Organization</ListItem>
                    <ListItem>menu2</ListItem>
                </List>
                <div className="nzg-content"></div>
            </div>)
    }
}


if (document.getElementById('example')) {
    ReactDOM.render(<App/>, document.getElementById('example'));
}
