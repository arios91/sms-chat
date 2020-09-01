import React from 'react'
import PropTypes from 'prop-types'

function MessagesContainer({messages}) {
    return (
        <div className="messagesContainer col-12 row">
            {messages.map(message => {
                return <div key={message.sid} className={"col-12 row d-block my-2 " + (message.delivery ? "text-right" : "text-left")}>
                    {message.author}<br/>{message.body}
                </div>
            })}
        </div>
    )
}

MessagesContainer.propTypes = {
    messages: PropTypes.array.isRequired,
}

export default MessagesContainer

