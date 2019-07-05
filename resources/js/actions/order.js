import * as ActionTypes from './actionTypes'

export function createOrder(data) {
    return {
        type: ActionTypes.CREATE_ORDER,
        payload: {
            request:{
                method: 'post',
                url:'/gym/' + data.gym + '/order',
                data
            }
        }
    }
}