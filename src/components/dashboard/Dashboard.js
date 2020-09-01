import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import ConversationsContainer from '../conversations/ConversationsContainer';
import {logout} from '../../actions/auth'
import {createConversation, sendConversationMessage, deleteConversation, getConversations} from '../../actions/messaging';

const Dashboard = ({logout, createConversation, deleteConversation, auth:{user, loading}}) => {

    const [conversationFormData, setConversationFormData] = useState({
        friendlyName: '',
        conversationBindingString: ''
    })

    const [conversationDeleteFormData, setConversationDeleteFormData] = useState({
        conversationDeleteId: ''
    })

    const {friendlyName, conversationBindingString} = conversationFormData;
    const {conversationDeleteId} = conversationDeleteFormData;

    const onConversationFormChange = e => setConversationFormData({...conversationFormData, [e.target.name]: e.target.value});
    const onConversationDeleteFormChange = e => setConversationDeleteFormData({...conversationDeleteFormData, [e.target.name]: e.target.value});

    
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
    
    const submitConversationDeleteForm = async e => {
        e.preventDefault();
        console.log('Deleting conversation');
        if(conversationDeleteId == ''){
            console.log('conversation id is required');
        }else{
            const {companyName, companyId} = user;
            if(companyId == ''){
                alert('Error retrieving your company id');
            }else{
                deleteConversation({conversationDeleteId, companyName, companyId});
            }
        }
    }

    const doLogout = e => {
        logout();
    }

    
    return loading ? <Spinner/>: 
    <div>
        <h1>SMS Chat Basics</h1>
        <hr className="bold"/>
        <div>
            <button className="btn btn-danger" name="logout" onClick={e => doLogout(e)}>
                Log out
            </button>
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
            <h3>Delete Conversation</h3>
            <form className="form" onSubmit={e => submitConversationDeleteForm(e)}>
                <div className="form-grup">
                    <input type="text" name="conversationDeleteId" id="conversationDeleteIdInput" placeholder="Conversation Id" value={conversationDeleteId} onChange={e => onConversationDeleteFormChange(e)}/>
                </div>
                <input type="submit" value="Delete Conversation"/>
            </form>
        </div>
        <hr className="bold"/>
        <ConversationsContainer/>
    </div>
}

Dashboard.propTypes = {
    createConversation: PropTypes.func.isRequired,
    getConversations: PropTypes.func.isRequired,
    sendConversationMessage: PropTypes.func.isRequired,
    deleteConversation: PropTypes.func.isRequired,
    getConversations: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth,
    messaging: state.messaging
})

export default connect(mapStateToProps, {logout, getConversations, createConversation, sendConversationMessage, deleteConversation})(Dashboard);
