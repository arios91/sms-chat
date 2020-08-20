import axios from 'axios';
import {setAlert} from './alert';
import {API_URL, GET_USERS} from '../actions/constants'

export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/users/all`);

        dispatch({
            type: GET_USERS,
            payload: res.data
        })

    } catch (error) {
        console.log(error);
    }
}