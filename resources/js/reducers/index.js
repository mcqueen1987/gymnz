import { combineReducers } from 'redux';
import organization from './organization';
import setting from './setting';
import gym from './gym';


export default combineReducers({
    setting,
    organization,
    gym,
});