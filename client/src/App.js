import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import Join from './redux/components/join/Join'
import Chat from './redux/components/chat/ChatContainer'
import Error from './redux/components/error/ErrorContainer'

import history from './history'
import './App.css'

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Join}></Route>
                    <Route path="/chat" exact component={Chat}></Route>
                    <Route component={Error}></Route> 
                </Switch>
            </Router>
        </Provider>
    )
}

export default App
