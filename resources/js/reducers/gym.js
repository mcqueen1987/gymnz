import * as ActionTypes from '../actions/actionTypes';

const initState = {
    // coach related
    coaches: [],
    showNewCoach: false,
    showNewOrder: false,
    loading: false,
    errorMsg: '',
    successMsg: '',

    // order related
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

        default:
            return state;
    }
};

export default gym;