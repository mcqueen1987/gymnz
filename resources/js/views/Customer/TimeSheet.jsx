import "../../../sass/customer.scss"
import React from 'react';
import GridItem from "-components/Grid/GridItem.jsx";
import GridContainer from "-components/Grid/GridContainer.jsx";
import * as utils from "-utils";
import { Tabs, Tab } from "@material-ui/core";
import * as color from "-color"
import { withStyles } from '@material-ui/core/styles';


const PrimaryTabs = withStyles({
    indicator: {
        backgroundColor: color.primary
    }
})(props => <Tabs {...props} />);


class TimeSheet extends React.Component {
    constructor(props) {
        super(props);
    }

    getTimeCell = (index, disabled, active) => {
        let grid = ['time-cell'];
        if (disabled) {
            grid.push('disabled');
        }
        if (active) {
            grid.push(active);
        }
        grid = grid.join(' ');
        return <GridItem xs={3} sm={3} md={2}
            key={index}
            classes={{ grid }}
            onClick={() => { this.props.onSelect(index) }}>
            {utils.getTimeStr(index)}
        </GridItem>;
    };

    getTimeCells = (start, end, availableTime, activeTime) => {
        let ret = [];
        for (let i = start; i < end; i++) {
            let disabled = availableTime.indexOf(i) < 0;
            let active = activeTime.indexOf(i) >= 0 ? 'active-' + activeTime.indexOf(i) : undefined;
            ret.push(this.getTimeCell(i, disabled, active));
        }
        return ret;
    }
    

    render() {
        const { available, selectedTimeSlot, start, end, selectedDayIndex } = this.props;
        return <div className='time-sheet'>
            <PrimaryTabs onChange={this.props.onDaySelect}variant="scrollable" value={selectedDayIndex}>
                {this.props.days.map(day => <Tab key={day} label={day}></Tab>)}
            </PrimaryTabs>
            <GridContainer>
                {this.getTimeCells(start, end, available, selectedTimeSlot)}
            </GridContainer>
        </div>

    }
}

export default TimeSheet;