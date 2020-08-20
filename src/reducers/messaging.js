import {SEND_MESSAGE, RETRIEVE_MESSAGE, RETRIEVE_MESSAGES, CREATE_CONVERSATION} from '../actions/constants';

const initialState = {
    messages: [],
    conversations: [],
    loading: true
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case SEND_MESSAGE:
            return{
                ...state,
                messages: payload,
                loading: false
            };
        case CREATE_CONVERSATION:
            return{
                ...state,
                conversations: payload,
                loading: false
            }
        case RETRIEVE_MESSAGE:
            return{
                ...state,
                messages: payload,
                loading: false
            }
        default:
            return state;
    }
}