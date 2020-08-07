import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage, sendMessage } from '../chat/ChatActions'
import './Input.css'

function Input() {
    const message = useSelector(state => state.message)
    const dispatch = useDispatch()

    console.log(message)
    return (
        <form className="form">
            <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(event) => dispatch(setMessage(event.target.value))}
            onKeyPress={(event) => event.key === 'Enter' && message ? dispatch(sendMessage(event, message)) : null}
            />
            <button
            className="sendButton"
            onClick={(event) =>  message ? dispatch(sendMessage(event, message)) : null}
            >Send</button>
        </form>
    )
}

export default Input
