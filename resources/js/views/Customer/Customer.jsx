import "../../../sass/customer.scss"
import React from 'react';
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Paper from '@material-ui/core/Paper';
import Tabs from "-components/CustomTabs/CustomTabs.jsx";
import Table from "-components/Table/Table.jsx";

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            customerId: props.match.params.id,
            selectedDate: new Date(),
        }
    }

    getBookTab = () => {
        return <p>TODO</p>;
    };

    getOrdersTab = () => {
        
        let orders  = this.props.gym.selectedCustomer.orders;
        if(!orders) {
            return <p>No Orders</p>;
        }
        let header = ['Price', 'Course', 'Coach', 'Created'];
        let tableData = orders.map(r => [r.price, r.course_amount, r.coach.user.name, r.created_at.split(' ')[0]])

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
                break;
            case 1:
                this.props.actions.loadCustomerOrders(this.state.customerId, { gym: this.props.selectedGym.id });
                break;
            default:
                break;
        }

    };

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