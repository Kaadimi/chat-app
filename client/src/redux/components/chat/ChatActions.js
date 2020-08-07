import history from '../../../history' 
import socket from '../../../socket'

const { SET_MESSAGE, SET_USERS, JOIN_REQUEST, JOIN_FAILURE, JOIN_SUCCESS, SET_MESSAGES } = require("../../actions")

export const leaveGame = () => {
    return function() {
        socket.disconnect()
        socket.off()
    }
}

export const socketListeners = () => {
    return function(dispatch) {
        socket.on('message', message => {
            dispatch(setMessages(message))
        })
        socket.on("roomData", ({ users }) => {
            dispatch(setUsers(users))
          });
    }
}

export const sendMessage = (event, message) => {
    return function (dispatch) {
        event.preventDefault()
        socket.emit('sendMessage', message, () => {
            dispatch(setMessage(''))
        })
    }
}

export const setMessage = (payload) => {
    return {
        type: SET_MESSAGE,
        payload
    }
}

export const setMessages = (payload) => {
    return {
        type: SET_MESSAGES,
        payload
    }
}

export const setUsers = (payload) => {
    return {
        type: SET_USERS,
        payload
    }
}

export const joinRequest = () => {
    return {
        type: JOIN_REQUEST
    }
}

export const joinFailure = (payload) => {
    return {
        type: JOIN_FAILURE,
        payload
    }
}

export const joinSuccess = (payload) => {
    return {
        type: JOIN_SUCCESS,
        payload
    }
}

export const joinActionCreator = ({name, room}) => {
    return function (dispatch) {
        dispatch(joinRequest())
        console.log(name, room)
        socket.connect()
        socket.emit('join', {name, room}, ({costumRoom, error, success}) => {
            console.log(costumRoom, error, success)
            if (costumRoom) {
                dispatch(joinSuccess({name, room: costumRoom}))
                history.replace(`/chat/?room=${costumRoom}&name=${name}`)
            }
            else if (error)
                dispatch(joinFailure(error))
            else
                dispatch(joinSuccess({name, room}))
        })
    }
}