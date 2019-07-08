import * as ActionTypes from '../actions/actionTypes';

const initState = {
    // data
    coaches: [],
    customers: [],
    customerPage: {
        customerBalance: { total: 0, booked: 0 },
        orders: [],
        coachesSlots: [],
        pendingSchedule: null,
        schedules: {
            booked: [],
            finished: [],
        }
    },

    // dialogue
    showNewCoach: false,
    showNewOrder: false,

    // status and message
    loading: false,
    errorMsg: '',
    successMsg: '',
};

const NonAction = { type: "NO_ACTION" };

const gym = (state = initState, action = NonAction) => {
    switch (action.type) {

        case ActionTypes.SHOW_NEW_COACH:
            return Object.assign({}, state, { showNewCoach: true });
        case ActionTypes.CANCEL_NEW_COACH:
            return Object.assign({}, state, { showNewCoach: false });

        case ActionTypes.SHOW_NEW_ORDER:
            return Object.assign({}, state, { showNewOrder: true });
        case ActionTypes.CANCEL_NEW_ORDER:
            return Object.assign({}, state, { showNewOrder: false });

        case ActionTypes.LOAD_CUSTOMER:
            return Object.assign({}, state, { loading: true });
        case ActionTypes.LOAD_CUSTOMER_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                customers: action.payload.data,
            });
        case ActionTypes.LOAD_CUSTOMER_FAIL:
            return Object.assign({}, state, {
                errorMsg: 'Load customer list failed, please refresh the page',
                loading: false
            });

        case ActionTypes.LOAD_COACH:
            return Object.assign({}, state, { loading: true });
        case ActionTypes.LOAD_COACH_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                coaches: action.payload.data,
            });
        case ActionTypes.LOAD_COACH_FAIL:
            return Object.assign({}, state, {
                errorMsg: 'Load coach list failed, please refresh the page',
                loading: false
            });

        case ActionTypes.CREATE_COACH:
            return Object.assign({}, state, { loading: true });
        case ActionTypes.CREATE_COACH_SUCCESS:
            return Object.assign({}, state, {
                showNewCoach: false,
                loading: false,
                successMsg: 'Coach added',
                coaches: [...state.coaches, action.payload.data],
            });
        case ActionTypes.CREATE_COACH_FAIL:
            return Object.assign({}, state, {
                errorMsg: 'Create coach failed, please try again',
                loading: false
            });
        case ActionTypes.CLOSE_ERR_MSG:
            return Object.assign({}, state, {
                errorMsg: '',
            });
        case ActionTypes.CLOSE_SUCCESS_MSG:
            return Object.assign({}, state, {
                successMsg: '',
            });

        case ActionTypes.CREATE_ORDER:
            return Object.assign({}, state, { loading: true });
        case ActionTypes.CREATE_ORDER_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                showNewOrder: false,
                successMsg: 'Create order successed',
            });
        case ActionTypes.CREATE_ORDER_FAIL:
            return Object.assign({}, state, {
                errorMsg: 'Create order failed, please try again',
                loading: false
            });

        case ActionTypes.LOAD_GYM_AVAILABLE_SLOT:
            return Object.assign({}, state, { loading: true });
        case ActionTypes.LOAD_GYM_AVAILABLE_SLOT_SUCCESS:
            {
                let customerPage = { ...state.customerPage }
                customerPage.coachesSlots = action.payload.data;
                return Object.assign({}, state, {
                    customerPage,
                    loading: false,
                });
            }
        case ActionTypes.LOAD_GYM_AVAILABLE_SLOT_FAIL:
            return Object.assign({}, state, {
                errorMsg: 'Load gym timetable failed',
                loading: false
            });

        case ActionTypes.LOAD_CUSTOMER_COURSE_BALANCE:
            // do nothing
            return state;
        case ActionTypes.LOAD_CUSTOMER_COURSE_BALANCE_SUCCESS:
            {
                let customerPage = { ...state.customerPage }
                customerPage.customerBalance = action.payload.data;
                return Object.assign({}, state, { customerPage });;
            }
        case ActionTypes.LOAD_CUSTOMER_COURSE_BALANCE_FAIL:
            return Object.assign({}, state, {
                errorMsg: 'Load customer balance failed',
            });

        case ActionTypes.LOAD_CUSTOMER_ORDERS:
            // do nothing
            return state;
        case ActionTypes.LOAD_CUSTOMER_ORDERS_SUCCESS:
            {
                let customerPage = { ...state.customerPage }
                customerPage.orders = action.payload.data
                return Object.assign({}, state, { customerPage });
            }
        case ActionTypes.LOAD_CUSTOMER_ORDERS_FAIL:
            return Object.assign({}, state, {
                errorMsg: 'Load customer orders failed',
            });

        case ActionTypes.UPDATE_PENDING_SCHEDULE:
            {
                let customerPage = { ...state.customerPage };
                customerPage.pendingSchedule = action.data;
                return Object.assign({}, state, { customerPage });
            }
        case ActionTypes.CREATE_SCHEDULE:
            return Object.assign({}, state, { loading: true });
        case ActionTypes.CREATE_SCHEDULE_SUCCESS:
            {
                let updatedSelectedCustomer = { ...state.customerPage };
                let { start, end, coach_id } = action.payload.data;
                updatedSelectedCustomer.coachesSlots.forEach(c => {
                    if (c.id === coach_id) {
                        c.available = c.available.filter(h => h < start || h > end);
                    }
                })
                // clear pendingSchedule when save successfully
                updatedSelectedCustomer.pendingSchedule = null;
                // add booked count
                updatedSelectedCustomer.customerBalance.booked++;
                // add booked schedule
                updatedSelectedCustomer.schedules.booked.push(action.payload.data);

                return Object.assign({}, state, {
                    customerPage: updatedSelectedCustomer,
                    successMsg: 'Schedule save successed',
                    loading: false
                });
            }
        case ActionTypes.CREATE_SCHEDULE_FAIL:
            return Object.assign({}, state, {
                loading: false,
                errorMsg: 'Create schedule failed',
            });

        case ActionTypes.LOAD_CUSTOMER_SCHEDULE:
            // do nothing
            return state;
        case ActionTypes.LOAD_CUSTOMER_SCHEDULE_SUCCESS:
            {
                let customerPage = { ...state.customerPage };
                customerPage.schedules.booked = action.payload.data.filter(s => s.status === 1);
                customerPage.schedules.finished = action.payload.data.filter(s => s.status === 2);
                return Object.assign({}, state, { customerPage });;
            }
        case ActionTypes.LOAD_CUSTOMER_SCHEDULE_FAIL:
            return Object.assign({}, state, {
                errorMsg: 'Load customer schedule failed',
            });;
        default:
            return state;
    }
};

export default gym;