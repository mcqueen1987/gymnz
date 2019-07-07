import "../../../sass/customer.scss"
import React from 'react';
import classnames from 'classnames';
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Paper from '@material-ui/core/Paper';
import Tabs from "-components/CustomTabs/CustomTabs.jsx";
import Table from "-components/Table/Table.jsx";
import TimeSheet from "./TimeSheet.jsx";
import GridItem from "-components/Grid/GridItem.jsx";
import GridContainer from "-components/Grid/GridContainer.jsx";
import Avatar from '@material-ui/core/Avatar';
import * as utils from "-utils";
import Button from "-components/CustomButtons/Button.jsx";
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            customerId: parseInt(props.match.params.id),
            dates: this,
            selectedTimeSlot: [],
            selectedCoach: -1,
            selectedDayIndex: 0,
            selectedDay: dayjs(new Date()),
        }
    }

    refreshAvailableSlots = () => {
        let dj = dayjs(this.state.selectedDay);
        this.props.actions.loadAvailableSlotByDate(this.props.selectedGym.id, { date: dj.format('YYYYMMDD') })
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
            coach: this.state.selectedCoach.id,
            start: this.state.selectedTimeSlot[0],
            end: this.state.selectedTimeSlot[3],
            date: this.state.selectedDay.format('YYYY-MM-DD')
        };
        this.props.actions.updatePendingSchedule(params);
    };

    saveSchedule = () => {
        let schedule = this.props.gym.selectedCustomer.pendingSchedule;
        this.props.actions.createSchedule(schedule.gym, schedule);
    };

    getActiveSummary = () => {
        if (this.state.selectedTimeSlot.length === 0) {
            return <p>Please select available time and coach</p>
        }
        return <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <h4 color="primary">{this.state.selectedCoach.user.name}</h4>
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

    // step = 4 means select 4 slot one time
    onSelectTime = (index, step = 4) => {
        const available = this.state.selectedCoach.available;
        const { selectedTimeSlot } = this.state;
        let isSelectable = (i) => available.indexOf(i) >= 0 && selectedTimeSlot.indexOf(i) < 0;
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

    getBookTab = () => {
        let coachesSlots = this.props.gym.selectedCustomer.coachesSlots;
        if (!coachesSlots || coachesSlots.length == 0) {
            return <p>No available coach found</p>;
        }
        let timeSheetParams = {
            start: 24, // 06:00
            end: 96,  // 24:00
            available: this.state.selectedCoach ? this.state.selectedCoach.available : [],
            days: this.getSelectableDays(),
            selectedTimeSlot: this.state.selectedTimeSlot,
            selectedDayIndex: this.state.selectedDayIndex,
            onDaySelect: this.onSelectDate,
            onSelect: this.onSelectTime,
        }
        let hasSelectedTime = this.props.gym.selectedCustomer.pendingSchedule;

        return <GridContainer container justify="center">
            <GridItem xs={12} sm={12} md={2}>
                {coachesSlots.map(c =>
                    <div onClick={() => this.onSelectCoach(c)} key={c.id} className={classnames('coach-container', c.id === this.state.selectedCoach.id && 'active')}>
                        <Avatar className='coach-avatar'>{c.user.name[0]}</Avatar>
                        <span className='coach-name'>{c.user.name}</span>
                    </div>
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
    };

    getOrdersTab = () => {

        let orders = this.props.gym.selectedCustomer.orders;
        if (!orders) {
            return <p>No Orders</p>;
        }
        let header = ['Price', 'Course', 'Coach', 'Created'];
        let tableData = orders.map(r => [r.price + '', r.course_amount + '', r.coach.user.name, r.created_at]);

        return <Table classes={{ tableResponsive: 'no-margin-top' }}
            tableHeaderColor='primary'
            tableHead={header}
            tableData={tableData}
        />;
    };

    getDataTab = () => {

    };

    getPhotoTab = () => {

    };

    tapTab = (tabIndex) => {
        switch (tabIndex) {
            case 0:
                this.props.actions.loadAvailableSlotByDate(this.props.selectedGym.id, { date: this.state.date })
                break;
            case 1:
                this.props.actions.loadCustomerOrders(this.state.customerId, { gym: this.props.selectedGym.id });
                break;
            default:
                break;
        }
    };

    componentDidMount() {
        this.refreshAvailableSlots();
    }

    static getDerivedStateFromProps(props, state) {
        if (state.selectedCoach === -1 && props.gym.selectedCustomer.coachesSlots.length > 0) {
            return {
                selectedCoach: props.gym.selectedCustomer.coachesSlots[0],
            };
        }
        return null;
    }
    render() {
        return <Paper square>
            <Tabs
                title=""
                headerColor="primary"
                onSwitch={this.tapTab}
                tabs={[{
                    tabName: "Book",
                    tabContent: this.getBookTab(),
                }, {
                    tabName: "Orders",
                    tabContent: this.getOrdersTab(),
                },
                ]}
            />
        </Paper>
    }
}

const mapStoreToProps = (store) => {
    return {
        selectedGym: store.setting.selectedGym,
        gym: store.gym,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

const LinkedCustomer = connect(
    mapStoreToProps,
    mapDispatchToProps
)(Customer);

export default LinkedCustomer;