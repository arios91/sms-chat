import { combineReducers } from'redux';
import auth from './auth';
import alert from './alert';
import user from './user';
import messaging from './messaging';

export default combineReducers({
    auth,
    alert,
    user,
    messaging
});