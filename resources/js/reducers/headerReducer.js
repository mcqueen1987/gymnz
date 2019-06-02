import * as ActionTypes from '../actions/actionTypes';

const SELECTED_GYM_KEY = 'gymnz_selected_gym';


const initState = {
    userInfo:{name:'', email:''},
    // load from previous setting when init
    selectedGym: localStorage && JSON.parse(localStorage.getItem(SELECTED_GYM_KEY)) ? JSON.parse(localStorage.getItem(SELECTED_GYM_KEY)) : {},
};

const NON_ACTION = {
  type: ActionTypes.SWITCH_GYM
};

const headerReducer= (state = initState, action=NON_ACTION) => {
    switch(action.type){
        case ActionTypes.SWITCH_GYM:
            // load from local storage
            if(localStorage){
                localStorage.setItem(SELECTED_GYM_KEY, JSON.stringify(action.value))
            }
            return Object.assign({},state, {selectedGym: action.value});
        default:
            return state;
    }
};

export default headerReducer;