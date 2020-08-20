import axios from 'axios';
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';
import {API_URL, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE} from './constants';


export const sendMessage = ({messageBody, messageNumber, companyName, companyId}) => async dispatch => {
    const config = {headers:{'Content-Type' : 'application/json'}};
    
    const body = JSON.stringify({messageBody, messageNumber, companyName, companyId});
    console.log('Attempting to send message');
    console.log(body);
    try {
        const res = await axios.post(`${API_URL}/twilio/send/sms`, body, config);
        console.log(res);
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => console.log(error));
        }
    }
}