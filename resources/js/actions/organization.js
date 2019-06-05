import * as ActionTypes from './actionTypes'

/********ORG*********/
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

/********GYM*********/
export function cancelNewGym() {
    return {
        type: ActionTypes.CANCEL_NEW_GYM
    }
}
export function showNewGym() {
    return {
        type: ActionTypes.SHOW_NEW_GYM
    }
}

export function loadGym(){
    return {
        type: ActionTypes.LOAD_GYM,
        payload: {
            request:{
                url:'/gym'
            }
        }
    }
}
export function createGym(data) {
    return {
        type: ActionTypes.CREATE_GYM,
        payload: {
            request: {
                method: 'post',
                url: '/gym',
                data
            }
        }
    }
}

export function updateGym(gymId, data) {
    return {
        type: ActionTypes.UPDATE_GYM,
        payload: {
            request: {
                method: 'put',
                url: `/gym/${gymId}`,
                data
            }
        }
    }
}


