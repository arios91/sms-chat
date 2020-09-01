import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import MessagesContainer from './MessagesContainer';
import {getConversations, sendConversationMessage, getConversation} from '../../actions/messaging';
import io from 'socket.io-client';
import { API_URL } from '../../actions/constants';

const socket = io.connect(API_URL);

const ConversationsContainer = ({getConversations, auth:{user}, messaging:{loading, conversations}, sendConversationMessage}) => {
    const [selectedConversation, setSelectedConversation] = useState(null)
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if(user){
            getConversations(user.companyName, user.companyId);
        }
    }, [getConversations])

    const setSelected = id => {
        let tmpArr = conversations.filter(conv => conv.conversation.sid == id);
        if(tmpArr.length > 0){
            setSelectedConversation(tmpArr[0]);
            console.log(tmpArr[0]);
        }else{
            alert('Error selecting conversation')
        }
    }

    const loadConversation = (e) => {
        e.preventDefault();
        if(e.target.name == "clear"){
            setSelectedConversation(null);
        }else{
            setSelected(e.target.name);
        }
    }

    const sendMessage = e => {
        e.preventDefault();
        if(newMessage == ''){
            alert('Message can not be blank');
        }else{
            sendConversationMessage(user, selectedConversation, newMessage);
            setNewMessage('');
        }
    }
    
    return loading ? <Spinner/>:
    <div>
        <h3>Conversations</h3>
        <div className="conversationsContainer">
            {conversations.map(conv => {
                return <button key={conv.conversation.sid} name={conv.conversation.sid} type="button" className="btn btn-primary my-2" onClick={e => loadConversation(e)}>
                    {conv.conversation.friendlyName} - {conv.participants.map(participant => {
                        return participant.messagingBinding.address
                    })}
                </button>
            })}
            <br/>
            <button className="btn btn-secondary" name="clear" onClick={e => loadConversation(e)}>Clear</button>
        </div>
        <hr></hr>
        {selectedConversation ? 
        <div className="row text-center">
            <h3 className="col-12">{selectedConversation.conversation.friendlyName}</h3>
            <MessagesContainer messages={selectedConversation.messages}/>

            <input type="text" name="newMessage" id="newMessage" className="col-12" value={newMessage} onChange={e => setNewMessage(e.target.value)}/>
            <button className="btn btn-primary col-12 my-2" onClick={e => sendMessage(e)}>Send Message</button>
        </div>
        :<div>No conversation Selected</div>}
    </div>
}

ConversationsContainer.propTypes = {
    getConversation: PropTypes.func.isRequired,
    getConversations: PropTypes.func.isRequired,
    sendConversationMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    messaging: state.messaging
})

export default connect(mapStateToProps, {getConversation, getConversations, sendConversationMessage})(ConversationsContainer);
