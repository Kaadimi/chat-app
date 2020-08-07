import React from 'react'
import { useSelector } from 'react-redux'
import './Messages.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './message/Message.js'

function Messages() {
    const messages = useSelector(state => state.messages)
    const name = useSelector(state => state.name)

    return (
        <ScrollToBottom className="messages">
            {messages.map((message, index) => (
                 <div key={index}>
                 <Message message={message} name={name}/>
                 </div>
            ))}
        </ScrollToBottom>
    )
}

export default Messages
