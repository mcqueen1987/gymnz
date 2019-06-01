import { combineReducers } from 'redux';
import organization from './organization';
import dashboard from './dashboard';
import header from './headerReducer'


export default combineReducers({
    header,
    organization,
    dashboard
});