import { combineReducers } from 'redux';
import organization from './organization';
import dashboard from './dashboard';
import header from './headerReducer';
import coach from './coach';

export default combineReducers({
    header,
    organization,
    dashboard,
    coach
});