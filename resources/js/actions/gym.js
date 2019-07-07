import * as ActionTypes from './actionTypes'

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
            request:{
                url:'/gym/' + gymId +'/coach'
            }
        }
    }
}

export function createCoach(gymId, data) {
    return {
        type: ActionTypes.CREATE_COACH,
        payload: {
            request:{
                method: 'post',
                url:'/gym/' + gymId + '/coach',
                data
            }
        }
    }
}

/********DELETE COACH*********/
export function deleteCoach(gymId, coachId, data) {
    return {
        type: ActionTypes.DELETE_COACH,
        payload: {
            request:{
                method: 'PUT',
                url:'/gym/' + gymId + '/coach/' + coachId,
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
            request:{
                url:'/gym/' + gymId +'/customer'
            }
        }
    };
}


/********BANNER*********/
export function closeErrMsg(){
    return {
        type: ActionTypes.CLOSE_ERR_MSG,
    }
}

export function closeSuccessMsg(){
    return {
        type: ActionTypes.CLOSE_SUCCESS_MSG,
    }
}