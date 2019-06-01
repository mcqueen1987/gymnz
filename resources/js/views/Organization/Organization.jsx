import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Button from "-components/CustomButtons/Button.jsx";
import Add from "@material-ui/icons/Add"
import DateRange from "@material-ui/icons/DateRange";
// core components
import GridItem from "-components/Grid/GridItem.jsx";
import GridContainer from "-components/Grid/GridContainer.jsx";
import Card from "-components/Card/Card.jsx";
import CardHeader from "-components/Card/CardHeader.jsx";
import CardIcon from "-components/Card/CardIcon.jsx";
import CardFooter from "-components/Card/CardFooter.jsx";
import {bugs, website, server} from "-variables/general.jsx";
import { dailySalesChart, emailsSubscriptionChart, completedTasksChart } from "-variables/charts.jsx";
import dashboardStyle from "-assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/organization';
import NewOrgDialogue from './NewOrgDialogue';
import "../../../sass/org.scss"

function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }
    return (
        <div className="warning">
            Warning!
        </div>
    );
}

class Organization extends React.Component {
    constructor(props) {
        super(props);
    }

    showAddOrg = () => {
        this.props.actions.showNewOrg();
    };

    addNewOrganization = () => {
        const tmpOrg = state.org.concat(
            {
                name: "有限开发公司3",
                add: '13 banks rd, Auckland 3',
                owner: 'golden man 3',
            }
        );
        this.setState({
            org: tmpOrg
        });
    };

    componentWillMount = () => {
        this.props.actions.loadOrg()
    };

    render() {
        const {classes} = this.props;
        console.log(this.props.organization.userInfo);
        return (
            <div>
                { this.props.organization.showAddOrgWindow && <NewOrgDialogue actions={this.props.actions}/> }
                { !this.props.organization.showAddOrgWindow && <GridContainer>
                    {
                        this.props.organization.org.map((item) => {
                            return (
                                <GridItem key={item.id} xs={12} sm={6} md={6} lg={4}>
                                    <Card>
                                        <CardHeader color="primary" stats icon>
                                            <CardIcon color="primary">
                                                <h4>{item.name}</h4>
                                            </CardIcon>
                                            <h3 className={classes.cardTitle}>{item.description}</h3>
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

                    <Button justIcon round className="new-org-btn" onClick={this.showAddOrg}><Add /></Button>

                </GridContainer>}
            </div>
        );
    }
}

Organization.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStoreToProps = (store) => {
    return {
        organization: store.organization
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

const LinkedOrganization = connect(
    mapStoreToProps,
    mapDispatchToProps
)(Organization);

export default withStyles(dashboardStyle)(LinkedOrganization);
