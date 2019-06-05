import { combineReducers } from 'redux';
import organization from './organization';
import dashboard from './dashboard';
import setting from './setting';
import coach from './coach';


export default combineReducers({
    setting,
    organization,
    dashboard,
    coach,
});