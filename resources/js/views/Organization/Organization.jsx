import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
// core components
import GridItem from "-components/Grid/GridItem.jsx";
import GridContainer from "-components/Grid/GridContainer.jsx";
import Card from "-components/Card/Card.jsx";
import CardHeader from "-components/Card/CardHeader.jsx";
import CardIcon from "-components/Card/CardIcon.jsx";
import CardFooter from "-components/Card/CardFooter.jsx";

import {bugs, website, server} from "-variables/general.jsx";

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "-variables/charts.jsx";

import dashboardStyle from "-assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {Route, Switch} from "react-router-dom";
import routes from "../../routes";

const INITIAL_STATE = {
    org: [
        {
            name: "有限开发公司",
            add: '13 banks rd, Auckland',
            owner: 'golden man',
        },
        {
            name: "有限开发公司2",
            add: '13 banks rd, Auckland 2',
            owner: 'golden man 2',
        }
    ]
};


class Organization extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    onClearArray = () => {
        this.setState({list: []});
    };
    onResetArray = () => {
        this.setState({...INITIAL_STATE});
    };
    addNewOrganization = () => {
        this.setState(state => {
            const tmpOrg = state.org.concat(
                {
                    name: "有限开发公司3",
                    add: '13 banks rd, Auckland 3',
                    owner: 'golden man 3',
                }
            );
            return {
                org: tmpOrg,
            }
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <GridContainer>
                    {
                        this.state.org.map((item, key) => {
                            return (
                                <GridItem key={key} xs={12} sm={6} md={3}>
                                    <Card>
                                        <CardHeader color="success" stats icon>
                                            <CardIcon color="success">
                                                <Store/>
                                            </CardIcon>
                                            <p className={classes.cardCategory}>Revenue</p>
                                            <h3 className={classes.cardTitle}>{item.name}</h3>
                                        </CardHeader>
                                        <CardFooter stats>
                                            <div className={classes.stats}>
                                                <DateRange/>
                                                Last 24 Hours
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </GridItem>
                            )
                        })
                    }

                    {/*here add new organization*/}
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="success" stats icon>
                                <CardIcon color="success">
                                    <Store/>
                                </CardIcon>
                                <p className={classes.cardCategory}>Add</p>
                                <h3 className={classes.cardTitle} onClick={this.addNewOrganization}> + </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <DateRange/>
                                    Last 24 Hours
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>


                </GridContainer>
            </div>
        );
    }
}

Organization.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Organization);
