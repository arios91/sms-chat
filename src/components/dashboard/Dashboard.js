import React, {useState} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {getUsers} from '../../actions/user';
import Spinner from '../layout/Spinner'
import { sendMessage } from '../../actions/messaging';

const Dashboard = ({sendMessage, auth:{user, loading}}) => {
    const [messageFormData, setMessageFormData] = useState({
        messageBody: '',
        messageNumber: ''
    })

    const {messageBody, messageNumber} = messageFormData;

    const onMessageFormChange = e => setMessageFormData({...messageFormData, [e.target.name]: e.target.value})

    const submitMessageForm = async e => {
        e.preventDefault();
        console.log('Sending message');
        if(messageBody == '' || messageNumber == ''){
            alert('Fill out all message fields');
        }else if(messageNumber.length != 10){
            alert('Invalid Number');
        }else{
            console.log(`${messageNumber} -> ${messageBody}`);
            const {companyName, companyId} = user;
            if(companyId == ''){
                alert('Error retrieving your company id');
            }else{
                sendMessage({messageBody, messageNumber, companyName, companyId});
            }
        }
    }
    
    return loading? <Spinner/>: 
    <div>
        <h1>Hey There!</h1>
        <div>
            <h3>Send Message</h3>
            <form className="form" onSubmit={e => submitMessageForm(e)}>
                <div className="form-grup">
                    <input type="text" name="messageBody" id="messageBodyInput" placeholder="Message Body" value={messageBody} onChange={e => onMessageFormChange(e)}/>
                </div>
                <div className="form-grup">
                    <input type="text" name="messageNumber" id="messageNumberInput" placeholder="Number" value={messageNumber} onChange={e => onMessageFormChange(e)}/>
                </div>
                <input type="submit" value="Send Message"/>

            </form>
        </div>
    </div>
}

Dashboard.propTypes = {
    sendMessage: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {sendMessage})(Dashboard);
