import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Button from "-components/CustomButtons/Button.jsx";
import Add from "@material-ui/icons/Add"
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
import * as Actions from '../../actions/coach';
import "../../../sass/coach.scss"
import CardBody from "-components/Card/CardBody";
import LoadingLayer from "-components/LoadingLayer/LoadingLayer"
import classNames from "classnames"
import CreateNewDialogue from "-components/CustomDialogues/CreateNewDialogue";

class Coach extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        if (this.props.selectedGym.id) {
            this.props.actions.loadCoach(this.props.selectedGym.id);
        }
    }

    showNewCoach = () => {
        this.props.actions.showNewCoach();
    };

    shouldComponentUpdate(nextProps) {
        if (nextProps.selectedGym.id && nextProps.selectedGym.id !== this.props.selectedGym.id) {
            this.props.actions.loadCoach(nextProps.selectedGym.id);
            return true
        }
        return nextProps.coach !== this.props.coach;
    }

    render() {
        const coachFields = [
            {
                name: 'name',
                validation: v => v.length > 0,
                placeholder: 'Name'
            },
            {
                name: 'email',
                type: 'email',
                validation: v => {
                    if (v.length && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)) {
                        return true
                    }
                    return false
                },
                placeholder: 'Email'
            },
            {
                name: 'password',
                type: 'password',
                validation: v => v.length >= 8, // TODO
                placeholder: 'Password'
            }

        ];
        return (
            <React.Fragment>
                {this.props.coach.loading && <LoadingLayer/>}
                <div className={classNames({'loading': this.props.coach.loading})}>
                    {!this.props.coach.showNewCoach &&
                    <GridContainer>
                        {
                            this.props.coach.coaches.map((item) => {
                                return (
                                    <GridItem key={item.id} xs={12} sm={6} md={6} lg={4}>
                                        <Card>
                                            <CardHeader color="primary" stats icon>
                                                <CardIcon color="primary" style={{width: '100%'}}>
                                                    <h4>{item.user.email}</h4>
                                                </CardIcon>
                                            </CardHeader>
                                            <CardBody>
                                                <h3>{item.user.name}</h3>
                                            </CardBody>
                                            <CardFooter stats style={{marginTop: 0}}>
                                                <div>
                                                    footer container, add something here!
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </GridItem>
                                )
                            })
                        }
                        {/*here add new coach*/}
                        <Button justIcon round className="new-coach-btn" onClick={this.showNewCoach}><Add/></Button>
                    </GridContainer>}
                    {/* create coach dialogue */}
                    {
                        this.props.coach.showNewCoach &&
                        <CreateNewDialogue
                            onCancel={this.props.actions.cancelNewCoach}
                            onSave={(data) => {
                                this.props.actions.createCoach(this.props.selectedGym.id, data);
                            }}
                            inputFields={coachFields}
                            title="Create Coach"
                        />
                    }
                </div>
            </React.Fragment>
        );
    }
}

Coach.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStoreToProps = (store) => {
    return {
        coach: store.coach,
        selectedGym: store.setting.selectedGym
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

const LinkedCoach = connect(
    mapStoreToProps,
    mapDispatchToProps
)(Coach);

export default withStyles(dashboardStyle)(LinkedCoach);
