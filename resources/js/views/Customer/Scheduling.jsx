import "../../../sass/customer.scss"
import React from 'react';
import classnames from 'classnames';
import TimeSheet from "./TimeSheet.jsx";
import GridItem from "-components/Grid/GridItem.jsx";
import GridContainer from "-components/Grid/GridContainer.jsx";
import Avatar from '@material-ui/core/Avatar';
import * as utils from "-utils";
import Button from "-components/CustomButtons/Button.jsx";
import dayjs from 'dayjs'
import Paper from '@material-ui/core/Paper';


class Scheduling extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: props.customerId,
            dates: [],
            selectedTimeSlot: [],
            selectedCoach: -1,
            selectedDayIndex: 0,
            selectedDay: dayjs(new Date()),
        }
    }

    refreshAvailableSlots = () => {
        let dj = dayjs(this.state.selectedDay);
        this.props.actions.loadAvailableSlotByDate(this.props.selectedGym.id, { date: dj.format('YYYY-MM-DD') })
    }

    getSelectableDays = (date, startDelta = 0, endDelta = 10) => {
        if (!date) {
            date = new Date();
        }
        let piv = dayjs(date);
        let ret = [];
        for (let i = startDelta; i < endDelta; i++) {
            ret.push(piv.add(i, 'day').locale('zh-cn').format('MM/DD dddd'));
        }
        return ret;
    };

    updatePendingSchedule = () => {
        let params = this.state.selectedTimeSlot.length === 0 ? null : {
            customer: this.state.customerId,
            gym: this.props.selectedGym.id,
            coach: this.selectedCoach.id,
            start: this.state.selectedTimeSlot[0],
            end: this.state.selectedTimeSlot[3],
            date: this.state.selectedDay.format('YYYY-MM-DD')
        };
        this.props.actions.updatePendingSchedule(params);
    };

    saveSchedule = () => {
        let schedule = this.props.gym.customerPage.pendingSchedule;
        this.props.actions.createSchedule(schedule.gym, schedule);
    };

    getActiveSummary = () => {
        if (this.state.selectedTimeSlot.length === 0) {
            return <p>Please select available time and coach</p>
        }
        return <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <h4 color="primary">{this.state.selectedCoach.name}</h4>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <p>
                    {this.state.selectedDay.locale('zh-cn').format('MM/DD dddd')}
                </p>
                <p>
                    {utils.getTimeStrMap()[this.state.selectedTimeSlot[0]]}
                </p>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} container alignItems="center" justify={"center"}>
                <Button color="primary" size='sm' onClick={this.saveSchedule}>Save</Button>
            </GridItem>
        </GridContainer>;
    }

    get selectedCoach() {
        return this.props.gym.customerPage.coachesSlots[this.state.selectedCoach];
    }

    get availableTimeSlot() {
        return this.selectedCoach ? this.selectedCoach.available : [];
    }

    // step = 4 means select 4 slot one time
    onSelectTime = (index, step = 4) => {
        const { selectedTimeSlot } = this.state;
        let isSelectable = (i) => this.availableTimeSlot.indexOf(i) >= 0 && selectedTimeSlot.indexOf(i) < 0;
        let selectable = true;
        let newActive = [];
        for (let i = 0; i < step; i++) {
            newActive.push(index + i);
            selectable &= isSelectable(index + i);
        }
        if (selectable) {
            this.setState({ selectedTimeSlot: newActive }, () => {
                this.updatePendingSchedule();
            });
        }
    };

    onSelectCoach = (selectedCoach) => {
        // clean selectedTimeSlot when change coach 
        this.setState({ selectedCoach, selectedTimeSlot: [] }, () => {
            this.updatePendingSchedule();
        });
    };

    onSelectDate = (_, i) => {
        //load coach avaiable time 
        let d = dayjs(new Date()).add(i, 'day');
        // clean selectedTimeSlot when change date 
        this.setState({ selectedDayIndex: i, selectedDay: d, selectedTimeSlot: [] }, () => {
            this.refreshAvailableSlots();
        });
    };

    componentDidMount() {
        this.refreshAvailableSlots();
        this.props.actions.loadCustomerBalance(this.state.customerId, { gym: this.props.selectedGym.id });
    }

    static getDerivedStateFromProps(props, state) {
        if (state.selectedCoach === -1 && props.gym.customerPage.coachesSlots.length > 0) {
            return {
                selectedCoach: 0,
            };
        }
        return null;
    }

    render() {
        let coachesSlots = this.props.gym.customerPage.coachesSlots;
        if (!coachesSlots || coachesSlots.length == 0) {
            return <p>No available coach found</p>;
        }
        let timeSheetParams = {
            start: 24, // 06:00
            end: 96,  // 24:00
            available: this.availableTimeSlot,
            days: this.getSelectableDays(),
            selectedTimeSlot: this.state.selectedTimeSlot,
            selectedDayIndex: this.state.selectedDayIndex,
            onDaySelect: this.onSelectDate,
            onSelect: this.onSelectTime,
        }
        let hasSelectedTime = this.props.gym.customerPage.pendingSchedule;

        return <GridContainer container justify="center">
            <GridItem container xs={12} sm={12} md={2} classes={{grid:'coach-grid'}} >
                {coachesSlots.map((c, i) =>
                    <GridItem key={c.id} xs={3} sm={3} md={12}>
                        <div onClick={() => this.onSelectCoach(i)}  className={classnames('coach-container',  i === this.state.selectedCoach && 'active')}>
                            <Avatar className='coach-avatar'>{c.user.name[0]}</Avatar>
                            <span className='coach-name'>{c.user.name}</span>
                        </div>
                    </GridItem>
                )}
            </GridItem>
            <GridItem xs={12} sm={12} md={hasSelectedTime ? 8 : 10}>
                <Paper className='timesheet-container'>
                    <TimeSheet {...timeSheetParams} />
                </Paper>
            </GridItem>
            {hasSelectedTime && <GridItem xs={12} sm={12} md={2}>
                {this.getActiveSummary()}
            </GridItem>}
        </GridContainer>
    }
}

export default Scheduling;