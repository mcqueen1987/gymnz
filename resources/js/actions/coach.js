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

export function closeErrMsg(){
    return {
        type: ActionTypes.CLOSE_ERR_MSG,
    }
}
