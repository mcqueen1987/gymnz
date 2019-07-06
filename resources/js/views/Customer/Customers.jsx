import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import React from "react";
import Card from "-components/Card/Card.jsx";
import CardBody from "-components/Card/CardBody.jsx";
import Table from "-components/Table/Table.jsx";

import "../../../sass/customer.scss"

class Customers extends React.Component {
    constructor(props) {
        super(props);
    }

    getCustomerListData = () => {
        return this.props.gym.customers.map(c => [c.name, c.email, c.sex ? 'M' : 'F']);
    };

    onRowClick = (row) => {
        let customerId = this.props.gym.customers[row].id;
        this.props.history.push({pathname: `customer/${customerId}`});
    };

    render() {
        const header = ['Name', 'Email', 'Sex'];
        return (<div className='customers-page'>
                <Card>
                    <CardBody>
                        <Table classes={{ tableResponsive: 'no-margin-top' }}
                            tableHeaderColor="primary"
                            tableHead={header}
                            onRowClick={this.onRowClick}
                            tableData={this.getCustomerListData()}
                        />
                    </CardBody>
                </Card></div>);
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

const LinkedCustomers = connect(
    mapStoreToProps,
    mapDispatchToProps
)(Customers);

export default LinkedCustomers;