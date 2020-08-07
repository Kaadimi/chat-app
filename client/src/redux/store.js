import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import ChatReducer from './components/chat/ChatReducer'

const store = createStore(ChatReducer, applyMiddleware(thunk))

export default store;