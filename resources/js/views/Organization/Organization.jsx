import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Button from "-components/CustomButtons/Button.jsx";
import Add from "@material-ui/icons/Add"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// core components
import GridItem from "-components/Grid/GridItem.jsx";
import GridContainer from "-components/Grid/GridContainer.jsx";
import Card from "-components/Card/Card.jsx";
import CardHeader from "-components/Card/CardHeader.jsx";
import CardIcon from "-components/Card/CardIcon.jsx";
import CardFooter from "-components/Card/CardFooter.jsx";
import dashboardStyle from "-assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/organization';
import CreateNewDialogue from '-components/CumtomDialogues/CreateNewDialogue';
import "../../../sass/org.scss"
import CardBody from "-components/Card/CardBody";
import LoadingLayer from "-components/LoadingLayer/LoadingLayer"
import classNames from "classnames"

class Organization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeOrg: {}
        };
    }

    showAddOrg = () => {
        this.props.actions.showNewOrg();
    };

    showAddGym = (org) => () => {
        this.setState({activeOrg: org}, () => {
            this.props.actions.showNewGym();
        });
    };

    componentWillMount = () => {
        this.props.actions.loadOrg();
        this.props.actions.loadGym();
    };

    getDialogue = () =>{
        const orgFields = {
            onCancel: this.props.actions.cancelNewOrg,
            onSave: this.props.actions.createOrg,
            title: 'Create Organization',
            inputFields: [{
                name: 'name',
                validation: v => v.length > 0
            }, {
                name: 'description',
                validation: v => v.length > 0
            }]
        };
        const gymFields = {
            title: 'Create Gym',
            onCancel: this.props.actions.cancelNewGym,
            onSave: data => {
                data.org_id = this.state.activeOrg.id;
                this.props.actions.createGym(data);
            },
            inputFields: [{
                name: 'name',
                validation: v => v.length > 0,
            }, {
                name: 'description',
                validation: v => v.length > 0,
            }]
        };
        if(this.props.organization.showNewOrg) {
            return <CreateNewDialogue {...orgFields}/>
        }
        if(this.props.organization.showNewGym) {
            return <CreateNewDialogue {...gymFields}/>
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                {this.props.organization.loading && <LoadingLayer/>}
                <div className={classNames({'loading': this.props.organization.loading})}>
                    {this.getDialogue()}
                    {/* organization list page */}
                    {
                        !this.props.organization.showNewOrg &&
                        !this.props.organization.showNewGym &&
                        <GridContainer>
                            {
                                this.props.organization.org.map((item) => {
                                    return (
                                        <GridItem key={item.id} xs={12} sm={6} md={6} lg={4}>
                                            <Card>
                                                <CardHeader color="primary" stats icon>
                                                    <CardIcon color="primary" style={{width: '100%'}}>
                                                        <h4>{item.name}</h4>
                                                    </CardIcon>
                                                    {/*<h3 className={classes.cardTitle}>{item.description}</h3>*/}
                                                </CardHeader>
                                                <CardBody>
                                                    {this.props.organization.gym.filter(gym => gym.org_id === item.id).length ?
                                                        <List component="nav">
                                                            {this.props.organization.gym
                                                                .filter(gym => gym.org_id === item.id)
                                                                .map(item => {
                                                                    return <ListItem key={item.id} button>
                                                                        <ListItemText primary={item.name}/>
                                                                    </ListItem>;
                                                                })}
                                                        </List>
                                                        :
                                                        <h4>No gym found</h4>
                                                    }
                                                </CardBody>
                                                <CardFooter stats style={{marginTop: 0}}>
                                                    <div className={classes.stats}>
                                                    </div>
                                                    <Button size="sm" onClick={this.showAddGym(item)}>
                                                        Add Gym
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        </GridItem>
                                    )
                                })
                            }
                            {/*here add new organization*/}
                            <Button justIcon round className="new-org-btn" onClick={this.showAddOrg}><Add/></Button>
                        </GridContainer>
                    }
                </div>
            </React.Fragment>
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
