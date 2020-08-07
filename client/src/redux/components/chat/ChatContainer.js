import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string'
import InfoBar from '../infoBar/InfoBar'
import Input from '../input/Input'
import Messages from '../messages/Messages'
import Users from '../users/Users'
import Error from '../error/ErrorContainer'

import { socketListeners, joinActionCreator, leaveGame, joinFailure} from './ChatActions'

import './Chat.css'

function Chat({location}) {
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)
    const loading = useSelector(state => state.loading)

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)

        if (!name)
            dispatch(joinFailure("Name not specified"))
        else {
            dispatch(joinActionCreator({name, room}))
            dispatch(socketListeners())
        }
        return () => {
            dispatch(leaveGame())
        }
    }, [])

    return (
        <div className="topContainer">
            {!loading ? error ? <Error error={error}/> 
            : <div className="outerContainer">
                <div className="container">
                    <InfoBar />
                    <Messages />
                    <Input />
                </div>
                <Users />
                </div>
            : null}
        </div>
    )
}

export default Chat