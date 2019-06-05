import React from 'react'
import Card from "-components/Card/Card";
import CardHeader from "-components/Card/CardHeader";
import CardBody from "-components/Card/CardBody";
import GridItem from "-components/Grid/GridItem";
import GridContainer from "-components/Grid/GridContainer";
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css"
import "../../../sass/settings.scss"
import {bindActionCreators} from "redux";
import * as Actions from "../../actions/organization";
import connect from "react-redux/es/connect/connect";
import CardFooter from "-components/Card/CardFooter";
import Button from "-components/CustomButtons/Button";

class GymSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGymId: props.selectedGymId || 0,
            workingHours: {
                max: props.setting && props.setting.workingHours && props.setting.workingHours.max ? props.setting.workingHours.max : 28,
                min: props.setting && props.setting.workingHours && props.setting.workingHours.min ? props.setting.workingHours.min : 28
            }
        }
    }

    save = () => {
        this.props.actions.updateGym(
            this.state.selectedGymId,
            {
                setting: {
                    workingHours: {...this.state.workingHours}
                }
            }
        )
    };

    getTimeLabel = (v) => {
        let hour = Math.floor(v / 4);
        let min = ['00', '15', '30', '45'][v % 4];
        return `${hour}:${min}`;
    };

    static getDerivedStateFromProps(props, state) {
        if (props.selectedGymId !== state.selectedGymId) {
            return {
                selectedGymId: props.selectedGymId || 0,
                workingHours: {
                    min: props.setting && props.setting.workingHours && props.setting.workingHours.min ? props.setting.workingHours.min : 28,
                    max: props.setting && props.setting.workingHours && props.setting.workingHours.max ? props.setting.workingHours.max : 28
                }
            };
        }
        return null;
    }

    render() {
        return (<Card>
            <CardHeader color="primary">
                <h4>Settings</h4>
            </CardHeader>
            <CardBody>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <h5>Available Time</h5>
                        <br/>
                        <InputRange
                            formatLabel={value => this.getTimeLabel(value)}
                            draggableTrack
                            step={1}
                            maxValue={96}
                            minValue={28}
                            onChange={value => this.setState({workingHours: value})}
                            onChangeComplete={value => console.log(value)}
                            value={this.state.workingHours}/>
                        <br/>

                    </GridItem>
                </GridContainer>
            </CardBody>
            <CardFooter>
                <Button>Cancel</Button>
                <Button color="primary" onClick={this.save}>Save</Button>
            </CardFooter>
        </Card>);
    }
}

const mapStoreToProps = (store) => {
    return {
        setting: store.setting.selectedGym.setting,
        selectedGymId: store.setting.selectedGym.id
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

const LinkedGymSettings = connect(
    mapStoreToProps,
    mapDispatchToProps
)(GymSettings);

export default LinkedGymSettings;