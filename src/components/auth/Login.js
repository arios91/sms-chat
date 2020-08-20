import React, {Fragment, useState} from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
        console.log('test');
        login({email, password});
    }

    //redirect if loggin in
    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }


    return (
        <div className="container  row secondaryBg">
            <div className="col-12 text-center">
                <p className="lead text-white"><i className="fas fa-user"></i> Sign Into Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" required value={email} onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            required
                            value={password} onChange={e => onChange(e)} 
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Sign In" />
                    <p>Need an account? <Link to="/register">Register</Link></p>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);