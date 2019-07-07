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
    errorMsg: ''

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
            return Object.assign({}, state, {
                errorMsg: 'Load organizations failed, please refresh the page',
                loading: false
            });

        case ActionTypes.LOAD_GYM:
            return Object.assign({}, state, {loading: true});
        case ActionTypes.LOAD_GYM_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                gym: action.payload.data,
            });
        case ActionTypes.LOAD_GYM_FAIL:
            return Object.assign({}, state, {
                errorMsg: 'Load gym failed, please refresh the page',
                loading: false
            });

        case ActionTypes.CREATE_GYM:
            return Object.assign({}, state, {loading: true});
        case ActionTypes.CREATE_GYM_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                showNewGym: false,
                gym: [...state.gym, action.payload.data],
            });
        case ActionTypes.CREATE_GYM_FAIL:
            return Object.assign({}, state, {
                errorMsg: 'Create gym failed, please try again',
                loading: false
            });

        case ActionTypes.CREATE_ORG:
            return Object.assign({}, state, {loading: true});
        case ActionTypes.CREATE_ORG_SUCCESS:
            return Object.assign({}, state, {
                showNewOrg: false,
                loading: false,
                org: [...state.org, action.payload.data],
            });
        case ActionTypes.CREATE_ORG_FAIL:
            return Object.assign({}, state, {
                loading: false,
                errorMsg: 'Create organization failed, please try again',
            });

        case ActionTypes.DELETE_ORG:
            return Object.assign({}, state, {loading:true});
        case ActionTypes.DELETE_ORG_SUCCESS:
            return Object.assign({}, state,{
                showNewOrg: false,
                loading:false,
            });
        case ActionTypes.DELETE_ORG_FAIL:
            return Object.assign({}, state, {
                loading: false,
                errorMsg: 'Delete organization failed, please try again',
            });

        case ActionTypes.CLOSE_ERR_MSG:
            return Object.assign({}, state, {
                errorMsg: '',
            });
        case ActionTypes.UPDATE_GYM_SUCCESS:
            return Object.assign({}, state, {
                gym: state.gym.map(g => g.id === action.payload.data.id ? action.payload.data : g)
            });
        default:
            return state;
    }
    return state;
};

export default organization;