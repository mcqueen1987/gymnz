import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper';
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "-components/Grid/GridItem.jsx";
import GridContainer from "-components/Grid/GridContainer.jsx";
import Table from "-components/Table/Table.jsx";
import Tasks from "-components/Tasks/Tasks.jsx";
import CustomTabs from "-components/CustomTabs/CustomTabs.jsx";
import Danger from "-components/Typography/Danger.jsx";
import Card from "-components/Card/Card.jsx";
import CardHeader from "-components/Card/CardHeader.jsx";
import CardIcon from "-components/Card/CardIcon.jsx";
import CardBody from "-components/Card/CardBody.jsx";
import CardFooter from "-components/Card/CardFooter.jsx";
import Badge from "@material-ui/core/Badge";


import { bugs, website, server } from "-variables/general.jsx";
import Button from "-components/CustomButtons/Button.jsx";
import Add from "@material-ui/icons/Add"
import * as utils from '-utils';
import * as config from '-config';
import dayjs from 'dayjs'
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import CreateNewDialogue from '-components/CustomDialogues/CreateNewDialogue';
import classnames from 'classnames';

import "../../../sass/gymdayview.scss"
import 'dayjs/locale/zh-cn';

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "-variables/charts.jsx";

import dashboardStyle from "-assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { List, ListItem } from "@material-ui/core";
import DayjsUtils from "@date-io/dayjs";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date()
    }
  }

  handleDateChange = (selectedDate) => {
    this.setState({selectedDate}, () => {
      this.props.actions.LoadGymSchedule(this.props.selectedGym.id, {
        date: dayjs(selectedDate).format('YYYY-MM-DD')
      })
    });
  }

  componentWillMount() {
    this.props.actions.loadCoach(this.props.selectedGym.id)
    this.props.actions.LoadGymSchedule(this.props.selectedGym.id, {
      date: dayjs(this.state.selectedDate).format('YYYY-MM-DD')
    });
  }

  componentWillUnmount() {
    // close dialogue when leaving
    this.props.actions.cancelNewOrder();
  }

  tapNewOrder = () => {
    this.props.actions.showNewOrder();
  };

  newOrderDialog = () => {
    const fields = {
      onCancel: () => {
        this.props.actions.cancelNewOrder();
      },
      onSave: (data) => {
        this.props.actions.createOrder(data);
      },
      subtitle: this.props.selectedGym.name,
      title: 'Create Order',
      inputFields: [{
        name: 'name',
        label: 'Customer Name',
        validation: v => v.length > 0
      }, {
        name: 'sex',
        label: 'Sex',
        options: [{ value: 0, label: 'Female' }, { value: 1, label: 'Male' }],
      }, {
        name: 'phone',
        type: 'phone',
        placeholder: 'Phone'
      }, {
        name: 'price',
        type: 'number',
        placeholder: 'Price',
      }, {
        name: 'amount',
        value: '',
        type: 'number',
        placeholder: 'amount'
      }, {
        name: 'duration',
        label: 'Duration (month)',
        type: 'number',
        placeholder: 'Duration (month)'
      }, {
        name: 'gym',
        value: this.props.selectedGym.id,
        hide: true
      }, {
        name: 'coach',
        label: 'Coach',
        options: this.props.gym.coaches.map((coach) => { return { value: coach.id, label: coach.user.name } }),
      }]
    };
    return <CreateNewDialogue {...fields} />
  };
  getTimeAxisColumn = () => {
    return (<GridItem xs={1} sm={1} md={1} classes={{ grid: 'time-column' }}>
      <List>
        {utils.getTimeRange(config.startTime, config.endTime - 1).map(t => <ListItem className='time-slot' key={t}>{t[4] === '5' ? ' ' : t}</ListItem>)}
      </List>
    </GridItem>);
  }
  getCoachDayColumn = (c) => {
    let schedules = this.props.gym.schedules.filter(s => s.coach.id === c.id);
    let sealed = {};
    let desc = {};
    schedules.forEach(s => {
      utils.range(s.start, s.end).forEach(i => {
        sealed[i] = '-x';
      })
      sealed[s.start] = '-start';
      desc[s.start] = s.customer.name;
      // sealed[s.start + 1] = '-start';
      sealed[s.end] = '-end';
      // sealed[s.end - 1] = '-end';
    });
    return (
      <GridItem item xs key={c.id}>
        <List>
          {utils.range(config.startTime, config.endTime).map(t => {
            let borderCls = 'none';
            let timeStr = utils.getTimeStr(t);
            if (timeStr.split(':')[1] === '00') {
              borderCls = 'solid';
            }
            if (timeStr.split(':')[1] === '30') {
              borderCls = 'dot';
            }
            let scheduleSlotCls = sealed[t] ? 'schedule-slot' + sealed[t] : 'schedule-slot';
            return <ListItem key={t} className={classnames('time-slot', borderCls, scheduleSlotCls)}>{desc[t]}</ListItem>
          })}
        </List>
      </GridItem>);
  };

  getGymDayOverView = () => {
    return (<Paper elevation={12} className="gym-day-view-container">
      <Paper square elevation={0} className="gym-day-view-header">
        <GridContainer alignItems='center'>
          <GridItem xs={12} sm={12} md={1} container alignItems={'center'}>
            <MuiPickersUtilsProvider utils={DayjsUtils}  locale={'zh-cn'}>
              <DatePicker className='gymd-day-picker' format="MM/DD" value={this.state.selectedDate} onChange={this.handleDateChange} />
            </MuiPickersUtilsProvider>
          </GridItem>
          <GridItem container spacing={0} xs={11} sm={11} md={11} classes={{ grid: 'coach-column' }}>
            {this.props.gym.coaches.map(c => {
              return <GridItem item xs key={c.id}>
                <Badge className="coach-name"
                  color="secondary"
                  badgeContent={this.props.gym.schedules.filter(s => s.coach.id === c.id).length}>
                  {c.user.name}
                </Badge>
              </GridItem>
            })}
          </GridItem>
        </GridContainer>
      </Paper>

      <Paper square elevation={0} className='gym-day-view-body-container'>
        <GridContainer>
          {this.getTimeAxisColumn()}
          <GridItem container spacing={0} xs={11} sm={11} md={11} classes={{ grid: 'coach-column' }}>
            {this.props.gym.coaches.map(c => this.getCoachDayColumn(c))}
          </GridItem>
        </GridContainer>
      </Paper>
    </Paper>);
  };

  render() {
    const { classes } = this.props;
    return this.props.gym.showNewOrder ? this.newOrderDialog() : (<div>
      {this.getGymDayOverView()}
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                  </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
                </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
                </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
                </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                increase in today sales.
                </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
                </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>
                Last Campaign Performance
                </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
                </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>
                Last Campaign Performance
                </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
                </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
                </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Button justIcon round color="primary" className="add-order" onClick={this.tapNewOrder}><Add /></Button>
    </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

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

const LinkedDashboard = connect(
  mapStoreToProps,
  mapDispatchToProps
)(Dashboard);

export default withStyles(dashboardStyle)(LinkedDashboard);
