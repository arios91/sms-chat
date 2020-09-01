import axios from 'axios';
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';
import {API_URL, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE, LOADING_USER} from './constants';
import io from 'socket.io-client';
const socket = io.connect(API_URL);


//Load user
export const loadUser = () => async dispatch => {
  console.log('loading user');
  dispatch({type: LOADING_USER});

  if (localStorage.token) {
    console.log('got auth token');
    setAuthToken(localStorage.token);
    console.log(localStorage.token);
  }

  try {
    const res = await axios.get(`${API_URL}/auth`);
    console.log('loading user');
    console.log(res.data);

    //io.emit('login', res.data);


    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
  };


//Register user
export const register = ({fName, lName, nickName, email, password, registrationType, SID, token, companyName, companyId}) => async dispatch => {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }

  const body = JSON.stringify({fName, lName, nickName, email, password, registrationType, SID, token, companyName, companyId});
  console.log(body);
  try {
      const res = await axios.post(`${API_URL}/users/register`, body, config);
      console.log(res);
      dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
      })
      dispatch(loadUser());
  } catch (err) {
      const errors = err.response.data.errors;
      if(errors){
          errors.forEach(error => console.log(error));
      }
      // if(errors){
      //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      // }
      // dispatch({
      //     type: REGISTER_FAIL
      // })
  }
}


//Login user
export const login = ({email, password}) => async dispatch => {
  console.log('logging in ');
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }

  const body = JSON.stringify({email, password});
  try {
      const res = await axios.post(`${API_URL}/auth/login`, body, config);
      console.log(res.data);
      dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
      })

      dispatch(loadUser());
  } catch (err) {
    if(err.response){
      const errors = err.response.data.errors;
      errors.forEach(error => console.log(error.msg));
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
        type: LOGIN_FAIL
    })
  }
}

//logout/clear profile
export const logout = () => dispatch => {
  dispatch({type: CLEAR_PROFILE});
  dispatch({type: LOGOUT});
}