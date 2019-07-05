import * as ActionTypes from './actionTypes'

export function switchGym(value) {
    return {
        type: ActionTypes.SWITCH_GYM,
        value
    };
}

export function loadLoggedInCoachInfo() {
    return {
        type: ActionTypes.LOAD_LOGGED_IN_COACH_INFO,
        payload: {
            request:{
                url:'/coach'
            }
        }
    }
}
