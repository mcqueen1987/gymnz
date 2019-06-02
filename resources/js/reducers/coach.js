import * as ActionTypes from '../actions/actionTypes';

const initState = {
    coaches: [],
    showNewCoach: false,
    loading: false,
};

const NonAction = {type: "NO_ACTION"};

const coach = (state = initState, action=NonAction) => {
    switch (action.type) {

        case ActionTypes.SHOW_NEW_COACH:
            return Object.assign({}, state, {showNewCoach: true});
        case ActionTypes.CANCEL_NEW_COACH:
            return Object.assign({}, state, {showNewCoach: false});

        case ActionTypes.LOAD_COACH:
            return Object.assign({}, state, {loading: true});
        case ActionTypes.LOAD_COACH_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                coaches: action.payload.data,
            });
        case ActionTypes.LOAD_COACH_FAIL:
            return Object.assign({}, state, {loading: false});


        case ActionTypes.CREATE_COACH:
            return Object.assign({}, state, {loading: true});
        case ActionTypes.CREATE_COACH_SUCCESS:
            return Object.assign({}, state, {
                showNewCoach: false,
                loading: false,
                coaches: [...state.coaches, action.payload.data],
            });
        case ActionTypes.CREATE_COACH_FAIL:
            return Object.assign({}, state, {loading: false});

        default:
            return state;
    }
    return state;
};

export default coach;