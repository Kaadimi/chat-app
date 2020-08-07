import { SET_MESSAGES, JOIN_REQUEST, JOIN_FAILURE, JOIN_SUCCESS, LEAVE_GAME, SET_MESSAGE, SET_USERS, COSTUM_ROOM, HIDE_ERROR_BOX } from '../../actions'

const initialState = {
    loading: true,
    costum: true,
    name: '',
    room: '',
    message: '',
    messages: [],
    users: [],
    error: '',
}

const ChatReducer = (state = initialState, {type, payload}) => {
    switch (type)
    {
        case COSTUM_ROOM:
            return {
                ...state,
                costum: !state.costum
            }
        case JOIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case JOIN_FAILURE:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case JOIN_SUCCESS:
            return {
                ...state,
                name: payload.name,
                room: payload.room,
                loading: false
            }
        case LEAVE_GAME:
            return state
        case SET_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, payload]
            }
        case SET_USERS:
            return {
                ...state,
                users: payload
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: payload
            }
        case HIDE_ERROR_BOX:
            return {
                ...state,
                loading: false,
                error: ''
            }
        default:
            return state
    }
}

export default ChatReducer