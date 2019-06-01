import * as ActionTypes from '../actions/actionTypes';

const initState = {
    org: [
        {
            id: 1,
            name: "有限开发公司",
            add: '13 banks rd, Auckland',
            owner: 'golden man',
        },
        {
            id: 2,
            name: "有限开发公司2",
            add: '13 banks rd, Auckland 2',
            owner: 'golden man 2',
        }
    ],
    showAddOrgWindow: false,
    loading: false,
    userInfo: {},
};

const NonAction = {type: "NO_ACTION"};

const organization = (state = initState, action=NonAction) => {
    switch (action.type) {

        case ActionTypes.SHOW_NEW_ORG:
            return Object.assign({}, state, {showAddOrgWindow: true});
        case ActionTypes.CANCEL_NEW_ORG:
            return Object.assign({}, state, {showAddOrgWindow: false});

        case ActionTypes.LOAD_ORG:
            return Object.assign({}, state, {loading: true});
        case ActionTypes.LOAD_ORG_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                org: action.payload.data,
            });
        case ActionTypes.LOAD_ORG_FAIL:
            return Object.assign({}, state, {loading: false});

        case ActionTypes.CREATE_ORG:
            return Object.assign({}, state, {loading: true});
        case ActionTypes.CREATE_ORG_SUCCESS:
            return Object.assign({}, state, {
                showAddOrgWindow: false,
                loading: false,
                org: action.payload.data,
            });
        case ActionTypes.CREATE_ORG_FAIL:
            return Object.assign({}, state, {loading: false});
        default:
            return state;
    }
    return state;
};

export default organization;