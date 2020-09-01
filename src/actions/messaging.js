import axios from 'axios';
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';
import {API_URL, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE, LOAD_CONVERSATIONS, SEND_MESSAGE} from './constants';


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


export const createConversation = ({friendlyName, conversationBindingString, companyName, companyId}) => async dispatch => {
    try {
        const config = {headers:{'Content-Type' : 'application/json'}};
        const body = JSON.stringify({friendlyName, conversationBindingString, companyName, companyId});
        console.log('Attempting to create conversation');
        console.log(body);
        const res = await axios.post(`${API_URL}/twilio/conversation/create`, body, config);
        console.log(res);
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => console.log(error));
        } 
    }
}

export const sendConversationMessage = (user, selectedConversation, body) => async dispatch => {
    try {
        const config = {headers:{'Content-Type' : 'application/json'}};
        const postBody = JSON.stringify({author: user.nickName, body, conversationId: selectedConversation.conversation.sid, companyName: user.companyName, companyId : user.companyId});
        console.log('Sending conversation message');
        console.log(postBody);
        const res = await axios.post(`${API_URL}/twilio/conversation/sendMessage`, postBody, config);
        console.log(res);
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => console.log(error));
        } 
    }
}

export const deleteConversation = ({conversationDeleteId, companyName, companyId}) => async dispatch => {
    try {
        const config = {headers:{'Content-Type' : 'application/json'}};
        const postBody = JSON.stringify({conversationId : conversationDeleteId, companyName, companyId});
        console.log('Deleting conversation');
        console.log(postBody);
        const res = await axios.post(`${API_URL}/twilio/conversation/delete`, postBody, config);
        console.log(res);
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => console.log(error));
        } 
    }
}


export const getConversation = (conversationSid, user, conversations) => async dispatch => {
    try {
        console.log(`getting conversation: ${conversationSid}`);
        console.log(user);
        console.log(conversations);
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => console.log(error));
        } 
    }
}

export const getConversations = (companyName, companyId) => async dispatch => {
    try {
        console.log('getting conversations');
        const config = {headers:{'Content-Type' : 'application/json'}};
        const postBody = JSON.stringify({companyName, companyId});
        console.log(postBody);
        const res = await axios.post(`${API_URL}/twilio/conversation/all`, postBody, config);
        console.log(res);
        dispatch({
            type: LOAD_CONVERSATIONS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => console.log(error));
        } 
    }
}