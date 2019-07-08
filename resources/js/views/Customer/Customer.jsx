import "../../../sass/customer.scss"
import React from 'react';
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Paper from '@material-ui/core/Paper';
import Tabs from "-components/CustomTabs/CustomTabs.jsx";
import Table from "-components/Table/Table.jsx";
import Scheduling from "./Scheduling";

import 'dayjs/locale/zh-cn'

class Customer extends React.Component {
    constructor(props) {
        super(props);
    }

    getBookTab = () => {
        return <Scheduling {...this.props} customerId={parseInt(this.props.match.params.id)} />
    };

    getOrdersTab = () => {

        let orders = this.props.gym.customerPage.orders;
        if (!orders) {
            return <p>No Orders</p>;
        }
        let header = ['Price', 'Booked/Total', 'Coach', 'Created'];
        let tableData = orders.map(r => [r.price + '', r.booked_amount + ' / ' + r.course_amount, r.coach.user.name, r.created_at]);

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

    render() {
        let {booked, total} = this.props.gym.customerPage.customerBalance;
        return <Paper square>
            <Tabs
                title={booked + '/' + total}
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