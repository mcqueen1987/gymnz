import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Button from "-components/CustomButtons/Button.jsx";
import ButtonDelete from "-components/CustomButtons/ButtonDelete.jsx";
import Add from "@material-ui/icons/Add"
// core components
import GridItem from "-components/Grid/GridItem.jsx";
import GridContainer from "-components/Grid/GridContainer.jsx";
import Card from "-components/Card/Card.jsx";
import CardHeader from "-components/Card/CardHeader.jsx";
import CardIcon from "-components/Card/CardIcon.jsx";
import CardFooter from "-components/Card/CardFooter.jsx";
import dashboardStyle from "-assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/gym';
import "../../../sass/coach.scss"
import CardBody from "-components/Card/CardBody";
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
        return nextProps.gym !== this.props.gym;
    }
    render() {
        const coachFields = [{
                name: 'name',
                placeholder: 'Name'
            }, {
                name: 'sex',
                label: 'Sex',
                options: [{ value: 0, label: 'Female' }, { value: 1, label: 'Male' }],
            }, {
                name: 'phone',
                type: 'phone',
                placeholder: 'phone'
            }, {
                name: 'password',
                type: 'password',
                placeholder: 'Password'
            }];

        return (
            <React.Fragment>
                <div className={classNames({ 'loading': this.props.gym.loading })}>
                    {!this.props.gym.showNewCoach &&
                        <GridContainer>
                            {
                                this.props.gym.coaches.map((item) => {
                                    return (
                                        <GridItem key={item.id} xs={12} sm={6} md={6} lg={4}>
                                            <Card>
                                                <CardHeader color="primary" stats icon>
                                                    <CardIcon color="primary" style={{ width: '100%' }}>
                                                        <h4>{item.user.email}</h4>
                                                    </CardIcon>
                                                </CardHeader>
                                                <CardBody>
                                                    <h3>{item.user.name}</h3>
                                                </CardBody>
                                                <CardFooter stats style={{ marginTop: 0 }}>
                                                    <div>
                                                        {item.user.sex ? 'Male' : 'Female' }
                                                    </div>
                                                    <div>
                                                        <ButtonDelete
                                                            color="white" size='sm'
                                                            onSave={() => {
                                                                this.props.actions.deleteCoach(this.props.selectedGym.id, item.id);
                                                            }}
                                                            title="Delete Coach"
                                                        >  Delete
                                                        </ButtonDelete>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </GridItem>
                                    )
                                })
                            }
                            {/*here add new coach*/}
                            <Button justIcon round className="new-coach-btn" onClick={this.showNewCoach}><Add /></Button>
                        </GridContainer>}
                    {/* create coach dialogue */}
                    {
                        this.props.gym.showNewCoach &&
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
        gym: store.gym,
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
