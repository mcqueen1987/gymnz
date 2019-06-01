import * as ActionTypes from '../actions/actionTypes';

const initState = {
    userInfo:{name:'', email:''},
    selectedGym: {
    },
};

const NON_ACTION = {
  type: ActionTypes.SWITCH_GYM
};

const headerReducer= (state = initState, action=NON_ACTION) => {
    switch(action.type){
        case ActionTypes.SWITCH_GYM:
            return Object.assign({},state, {selectedGym: action.value});
        default:
            return state;
    }
};

export default headerReducer;