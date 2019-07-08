import * as ActionTypes from './actionTypes'
import { Action } from 'rxjs/internal/scheduler/Action';

/********COACH*********/
export function showNewCoach() {
    return {
        type: ActionTypes.SHOW_NEW_COACH
    }
}
export function cancelNewCoach() {
    return {
        type: ActionTypes.CANCEL_NEW_COACH
    }
}

/********ORDER*********/
export function showNewOrder() {
    return {
        type: ActionTypes.SHOW_NEW_ORDER
    }
}
export function cancelNewOrder() {
    return {
        type: ActionTypes.CANCEL_NEW_ORDER
    }
}

/********LOAD COACH*********/
export function loadCoach(gymId) {
    return {
        type: ActionTypes.LOAD_COACH,
        payload: {
            request: {
                url: '/gym/' + gymId + '/coach'
            }
        }
    }
}

export function createCoach(gymId, data) {
    return {
        type: ActionTypes.CREATE_COACH,
        payload: {
            request: {
                method: 'post',
                url: '/gym/' + gymId + '/coach',
                data
            }
        }
    }
}

/********LOAD CUSTOMER*********/
export function loadCustomer(gymId) {
    return {
        type: ActionTypes.LOAD_CUSTOMER,
        payload: {
            request: {
                url: '/gym/' + gymId + '/customer'
            }
        }
    };
}

/********WORKLOAD*********/
// params = { date: '20190203'}
export function loadAvailableSlotByDate(gymId, params) {
    return {
        type: ActionTypes.LOAD_GYM_AVAILABLE_SLOT,
        payload: {
            request: {
                url: '/gym/' + gymId + '/available',
                params,
            }
        }
    };
}

export function loadWorkload(gymId, date) {

}

/********SCHEDULE*********/
export function updatePendingSchedule(data) {
    return  {
        type: ActionTypes.UPDATE_PENDING_SCHEDULE,
        data,
    }
}

export function createSchedule(gymId, data) {
    return {
        type: ActionTypes.CREATE_SCHEDULE,
        payload: {
            request: {
                method: 'post',
                url: '/gym/' + gymId + '/schedule',
                data,
            }
        }
    };
}

export function LoadCustomerSchedule(gymId, params) {
    return {
        type: ActionTypes.LOAD_CUSTOMER_SCHEDULE,
        payload: {
            request: {
                url: '/gym/' + gymId + '/schedule',
                params
            }
        }
    };
}

/********CUSTOMER DETAIL*********/
export function loadCustomerBalance(userId, params) {
    return {
        type: ActionTypes.LOAD_CUSTOMER_COURSE_BALANCE,
        payload: {
            request: {
                url: '/user/' + userId + '/coursebalance',
                params
            }
        }
    };
}

export function loadCustomerOrders(userId, params) {
    return {
        type: ActionTypes.LOAD_CUSTOMER_ORDERS,
        payload: {
            request: {
                url: '/user/' + userId + '/orders',
                params
            }
        }
    };
}

/********BANNER*********/
export function closeErrMsg() {
    return {
        type: ActionTypes.CLOSE_ERR_MSG,
    }
}

export function closeSuccessMsg() {
    return {
        type: ActionTypes.CLOSE_SUCCESS_MSG,
    }
}