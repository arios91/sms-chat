import {GET_USERS} from '../actions/constants'

const initialState = {
    users: [],
    error: {},
    loading: true
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_USERS:
            return{
                ...state,
                users: payload,
                loading: false
            }
        default:
            return state
    }
}