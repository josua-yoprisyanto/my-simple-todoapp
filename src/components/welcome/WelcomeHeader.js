import React from 'react'
import "../../asset/css/welcome.css"
import { Link } from 'react-router-dom'
import noteImage from '../../asset/images/note-list.png'

const WelcomeHeader = () => {
    return (
        <header className='welcome-header mt-5 mb-5 container' id="home">
            <div className='header-img'>
                <img alt="note" src={noteImage} />
            </div>
            <div className='header-content'>
                <h1><strong>My Simple Todoapp Is Here</strong></h1>
                <span>organize your work and life easier</span>
                <Link to="/auth" className='header-button mt-3'>Get Started</Link>
            </div>
        </header>
    )
}

export default WelcomeHeader