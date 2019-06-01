import { combineReducers } from 'redux';
import organization from './organization';
import dashboard from './dashboard';


export default combineReducers({
    organization,
    dashboard
});