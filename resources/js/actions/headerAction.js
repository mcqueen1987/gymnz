import * as ActionTypes from './actionTypes'

export function switchGym(value) {
    return {
        type: ActionTypes.SWITCH_GYM,
        value
    };
}
