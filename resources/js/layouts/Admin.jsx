/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "-components/Navbars/Navbar.jsx";
import Sidebar from "-components/Sidebar/Sidebar.jsx";
import routes from "../routes.js";
import image from "-assets/img/sidebar-2.jpg";
import logo from "-assets/img/reactlogo.png";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import connect from "react-redux/es/connect/connect";
import dashboardStyle from "-assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import Snackbar from "-components/Snackbar/Snackbar";
import AddAlert from "@material-ui/icons/AddAlert";
import LoadingLayer from "-components/LoadingLayer/LoadingLayer"
const switchRoutes = (
    <Switch>
        {routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            }
        })}
    </Switch>
);

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: image,
            color: "blue",
            hasImage: true,
            fixedClasses: "dropdown show",
            mobileOpen: false
        };
    }

    selectDefaultGym = () => {
        if (this.props.gyms && this.props.gyms.length > 0) {
            this.props.actions.switchGym(this.props.gyms[0]);
            this.props.actions.loadCustomer(this.props.gyms[0].id);
        }
    };

    getRoute() {
        return this.props.location.pathname !== "/admin/maps";
    }

    resizeFunction = () => {
        if (window.innerWidth >= 960) {
            this.setState({ mobileOpen: false });
        }
    };

    componentWillMount() {
        this.props.actions.loadGym();
        //load customer list when init
        if (this.props.setting.selectedGym.id) {
            this.props.actions.loadCustomer(this.props.setting.selectedGym.id);
        }
    }

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            const ps = new PerfectScrollbar(this.refs.mainPanel);
        }
        window.addEventListener("resize", this.resizeFunction);
    }

    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({ mobileOpen: false });
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
    }

    render() {
        if (!this.props.setting.selectedGym.id) {
            this.selectDefaultGym();
        }
        const { classes, ...rest } = this.props;
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={routes}
                    logoText={this.props.setting.selectedGym.name}
                    logo={logo}
                    image={this.state.image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color={this.state.color}
                    {...rest}
                />
                <div className={classes.mainPanel} ref="mainPanel">
                    <Navbar
                        routes={routes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest}
                    />
                    <div className={classes.content}>
                        {this.props.gym.loading && <LoadingLayer />}
                        <Snackbar
                            place="tc"
                            color="danger"
                            icon={AddAlert}
                            message={this.props.gym.errorMsg}
                            open={!!this.props.gym.errorMsg}
                            closeNotification={() => this.props.actions.closeErrMsg()}
                            close
                        />
                        <Snackbar
                            place="tc"
                            color="success"
                            icon={AddAlert}
                            autoHideDuration={6000}
                            message={this.props.gym.successMsg}
                            open={!!this.props.gym.successMsg}
                            closeNotification={() => this.props.actions.closeSuccessMsg()}
                            onClose={() => this.props.actions.closeSuccessMsg()}
                            close
                        />
                        <div className={classes.container}>{switchRoutes}</div>
                    </div>
                </div>
            </div>
        );
    }
}

Admin.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStoreToProps = (store) => {
    return {
        gyms: store.organization.gym,
        gym: store.gym,
        setting: store.setting
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

const LinkedAdmin = connect(
    mapStoreToProps,
    mapDispatchToProps
)(Admin);

export default withStyles(dashboardStyle)(LinkedAdmin);
