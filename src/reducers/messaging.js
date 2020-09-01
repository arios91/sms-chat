import {SEND_MESSAGE, RETRIEVE_MESSAGE, RETRIEVE_MESSAGES, CREATE_CONVERSATION, LOAD_CONVERSATIONS} from '../actions/constants';

const initialState = {
    conversations: [],
    loading: true
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case SEND_MESSAGE:
            return{
                ...state,
                conversations: state.conversations.map(conv => conv.conversation.sid === payload.conversation.sid ? payload : conv ),
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
                loading: false
            }
        case LOAD_CONVERSATIONS:
            return{
                ...state,
                conversations: payload,
                loading: false
            }
        default:
            return state;
    }
}