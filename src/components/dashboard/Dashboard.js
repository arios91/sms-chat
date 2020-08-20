import React, {useState} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {getUsers} from '../../actions/user';
import Spinner from '../layout/Spinner'
import {sendMessage, createConversation, sendConversationMessage} from '../../actions/messaging';

const Dashboard = ({sendMessage, createConversation, sendConversationMessage, auth:{user, loading}}) => {
    const [messageFormData, setMessageFormData] = useState({
        messageBody: '',
        messageNumber: ''
    })

    const [conversationFormData, setConversationFormData] = useState({
        friendlyName: '',
        conversationBindingString: ''
    })

    const [conversationMessageFormData, setConversationMessageFormData] = useState({
        conversationId: '',
        conversationMessage: ''
    })

    const {messageBody, messageNumber} = messageFormData;
    const {friendlyName, conversationBindingString} = conversationFormData;
    const {conversationId, conversationMessage} = conversationMessageFormData;

    const onMessageFormChange = e => setMessageFormData({...messageFormData, [e.target.name]: e.target.value});
    const onConversationFormChange = e => setConversationFormData({...conversationFormData, [e.target.name]: e.target.value});
    const onConversationMessageFormChange = e => setConversationMessageFormData({...conversationMessageFormData, [e.target.name]: e.target.value});

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
    
    const submitConversationForm = async e => {
        e.preventDefault();
        console.log('Creating conversation');
        if(friendlyName == ''){
            console.log('Friendly Name is required');
        }else{
            const {companyName, companyId} = user;
            if(companyId == ''){
                alert('Error retrieving your company id');
            }else{
                createConversation({friendlyName, conversationBindingString, companyName, companyId});
            }
        }
    }
    
    const submitConversationMessageForm = async e => {
        e.preventDefault();
        console.log('Sending conversation Message');
        if(conversationId == ''){
            console.log('conversation id is required');
        }else{
            const {companyName, companyId, nickName} = user;
            if(companyId == ''){
                alert('Error retrieving your company id');
            }else{
                console.log(`Nickname: ${nickName}`);
                console.log(`Message: ${conversationMessage}`);
                let author = nickName;
                let body = conversationMessage;
                sendConversationMessage({author, body, conversationId, companyName, companyId});
            }
        }
    }
    
    return loading? <Spinner/>: 
    <div>
        <h1>SMS Chat Basics</h1>
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
        <hr className="bold"/>
        <div>
            <h3>Create Conversation</h3>
            <form className="form" onSubmit={e => submitConversationForm(e)}>
                <div className="form-grup">
                    <input type="text" name="friendlyName" id="friendlyNameInput" placeholder="Friendly Name" value={friendlyName} onChange={e => onConversationFormChange(e)}/>
                </div>
                <div className="form-grup">
                    <input type="text" name="conversationBindingString" id="conversationBindingStringInput" placeholder="Number" value={conversationBindingString} onChange={e => onConversationFormChange(e)}/>
                </div>
                <input type="submit" value="Create Conversation"/>
            </form>
        </div>
        <hr className="bold"/>
        <div>
            <h3>Send Conversation Message</h3>
            <form className="form" onSubmit={e => submitConversationMessageForm(e)}>
                <div className="form-grup">
                    <input type="text" name="conversationId" id="conversationIdInput" placeholder="Conversation Id" value={conversationId} onChange={e => onConversationMessageFormChange(e)}/>
                </div>
                <div className="form-grup">
                    <input type="text" name="conversationMessage" id="conversationMessageInput" placeholder="Message" value={conversationMessage} onChange={e => onConversationMessageFormChange(e)}/>
                </div>
                <input type="submit" value="Send Conversation Message"/>
            </form>
        </div>
    </div>
}

Dashboard.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    createConversation: PropTypes.func.isRequired,
    sendConversationMessage: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {sendMessage, createConversation, sendConversationMessage})(Dashboard);
