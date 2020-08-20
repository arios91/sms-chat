import React, {Fragment, useState} from 'react'
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert'; 
import { register } from '../../actions/auth'; 
import Switch from 'react-switch'
import PropTypes from 'prop-types'

const Register = ({isAuthenticated, register, setAlert}) => {
    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        nickName: '',
        registrationType: 0,
        email: '',
        password: '',
        password2: '',
        SID: '',
        token: '',
        companyName: '',
        companyId: ''
    });

    const {fName, lName, nickName, email, password, password2, registrationType, SID, token, companyName, companyId} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
        console.log('submitting');
        if(password !== password2){
            console.log('passwords do not match');
            setAlert('Passwords do not match', 'danger');
        }else{
            register({fName, lName, nickName, email, password, registrationType, SID, token, companyName, companyId});
        }
    }

    //redirect if loggin in
    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }

    const handleRegChange = e => {
        console.log('reg change');
        setFormData({...formData, [e.target.name]: e.target.value == "admin" ? 0 : 1});
    }
    
    const isAdmin = () => {
        console.log('checking');
        return registrationType == 0 ? true : false;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <button type="button" name="registrationType" value="admin" className={"btn btn-outline-primary mr-2 roundButton " + (registrationType == 0 ? 'active' : '')} onClick={e => handleRegChange(e)}>Admin</button>
                    <button type="button" name="registrationType" value="emp" className={"btn btn-outline-primary mx-2 roundButton " + (registrationType == 1 ? 'active' : '')} onClick={e => handleRegChange(e)}>Employee</button>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="First Name" name="fName" value={fName} onChange={e => onChange(e)}  />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Last Name" name="lName" value={lName} onChange={e => onChange(e)}  />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="NickName" name="nickName" value={nickName} onChange={e => onChange(e)}  />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email"  value={email} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        
                        value={password} onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        
                        value={password2} onChange={e => onChange(e)} 
                    />
                </div>
                {isAdmin() ? 
                <Fragment>
                    <div className="form-group">
                        <input type="text" placeholder="Company Name" name="companyName"  value={companyName} onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Twilio SID" name="SID"  value={SID} onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Twilio Token" name="token"  value={token} onChange={e => onChange(e)} />
                    </div>
                </Fragment>:
                <Fragment>
                    <div className="form-group">
                        <input type="text" placeholder="Company ID" name="companyId"  value={companyId} onChange={e => onChange(e)} />
                    </div>
                </Fragment>}
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/">Sign In</Link>
            </p>
        </Fragment>
    )
}

Register.protoTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);