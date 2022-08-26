import React from 'react'
import NotFoundImage from '../asset/images/404.png'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <img src={NotFoundImage} width="90%" height="500" />
            <Link to="/" className='btn btn-dark'>Back to Home</Link>
        </div>
    )
}

export default NotFound