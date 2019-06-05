import * as ActionTypes from '../actions/actionTypes';

const SELECTED_GYM_KEY = 'gymnz_selected_gym';


const initState = {
    userInfo:{name:'', email:''},
    // load from previous setting when init
    selectedGym: localStorage && JSON.parse(localStorage.getItem(SELECTED_GYM_KEY)) ? JSON.parse(localStorage.getItem(SELECTED_GYM_KEY)) : {},
    settings: {
        startTime: 36,
        endTime: 88,
    },
    gym: [],
    loading: false,
};

const NON_ACTION = {
  type: ActionTypes.SWITCH_GYM
};

const setting= (state = initState, action=NON_ACTION) => {
    switch(action.type){
        case ActionTypes.SWITCH_GYM:
            // load from local storage
            if(localStorage){
                localStorage.setItem(SELECTED_GYM_KEY, JSON.stringify(action.value))
            }
            return Object.assign({},state, {selectedGym: action.value});

        case ActionTypes.UPDATE_GYM:
            return Object.assign({}, state, {loading: true});
        case ActionTypes.UPDATE_GYM_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                gym: [...state.gym, action.payload.data],
            });
        case ActionTypes.UPDATE_GYM_FAIL:
            return Object.assign({}, state, {loading: false});

        default:
            return state;
    }
};

export default setting;