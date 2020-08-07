import React from 'react'
import { useDispatch } from 'react-redux'
import { hideErrorBox } from './ErrorActions'
import { Link } from 'react-router-dom'
import './Error.css'

function ErrorContainer({ error = '404 PAGE NOT FOUND' }) {
    const dispatch = useDispatch()
    
    return (
        <div className="alertContainer">
            <div className="contentContainer">
                <p> OOPS, SORRY!</p>
                <p>{ error }</p>
                <Link onClick={() => dispatch(hideErrorBox())} to={`/`}>
                    <button className="homeButton">GO HOME</button>
                </Link>
            </div>
        </div>
    )
}

export default ErrorContainer
