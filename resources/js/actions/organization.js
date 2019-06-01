import * as ActionTypes from './actionTypes'


export function showNewOrg() {
    return {
        type: ActionTypes.SHOW_NEW_ORG
    }
}
export function cancelNewOrg() {
    return {
        type: ActionTypes.CANCEL_NEW_ORG
    }
}

export function loadOrg() {
    return {
        type: ActionTypes.LOAD_ORG,
        payload: {
            request:{
                url:'/org'
            }
        }
    }
}
export function createOrg(data) {
    return {
        type: ActionTypes.CREATE_ORG,
        payload: {
            request:{
                method: 'post',
                url:'/org',
                data
            }
        }
    }
}