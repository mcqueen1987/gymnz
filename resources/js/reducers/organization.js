import * as ActionTypes from '../actions/actionTypes';

const initState = {
    org: [
        // {
        //     id: 1,
        //     name: "有限开发公司",
        //     description: '13 banks rd, Auckland',
        //     create_by: 'golden man',
        // }
    ],
    gym: [],
    showNewOrg: false,
    showNewGym: false,
    loading: false,
};

const NonAction = {type: "NO_ACTION"};

const organization = (state = initState, action=NonAction) => {
    switch (action.type) {

        case ActionTypes.SHOW_NEW_ORG:
            return Object.assign({}, state, {showNewOrg: true});
        case ActionTypes.CANCEL_NEW_ORG:
            return Object.assign({}, state, {showNewOrg: false});

        case ActionTypes.SHOW_NEW_GYM:
            return Object.assign({}, state, {showNewGym: true});
        case ActionTypes.CANCEL_NEW_GYM:
            return Object.assign({}, state, {showNewGym: false});

        case ActionTypes.LOAD_ORG:
            return Object.assign({}, state, {loading: true});
        case ActionTypes.LOAD_ORG_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                org: action.payload.data,
            });
        case ActionTypes.LOAD_ORG_FAIL:
            return Object.assign({}, state, {loading: false});

        case ActionTypes.LOAD_GYM:
            return Object.assign({}, state, {loading: true});
        case ActionTypes.LOAD_GYM_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                gym: action.payload.data,
            });
        case ActionTypes.LOAD_GYM_FAIL:
            return Object.assign({}, state, {loading: false});

        case ActionTypes.CREATE_GYM:
            return Object.assign({}, state, {loading: true});
        case ActionTypes.CREATE_GYM_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                showNewGym: false,
                gym: [...state.gym, action.payload.data],
            });
        case ActionTypes.CREATE_GYM_FAIL:
            return Object.assign({}, state, {loading: false});

        case ActionTypes.CREATE_ORG:
            return Object.assign({}, state, {loading: true});
        case ActionTypes.CREATE_ORG_SUCCESS:
            return Object.assign({}, state, {
                showNewOrg: false,
                loading: false,
                org: [...state.org, action.payload.data],
            });
        case ActionTypes.CREATE_ORG_FAIL:
            return Object.assign({}, state, {loading: false});
        default:
            return state;
    }
    return state;
};

export default organization;