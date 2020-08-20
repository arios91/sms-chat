import {SEND_MESSAGE, RETRIEVE_MESSAGE, RETRIEVE_MESSAGES} from '../actions/constants';

const initialState = {
    messages: [],
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