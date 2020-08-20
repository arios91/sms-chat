import React, {useEffect, Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import './App.css';


//Redux
import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  })
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="container text-center maxHeight">
            <Route exact path="/" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;