import React, { useEffect, useState } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import "../asset/css/navbar.css"
import { Link } from 'react-scroll'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

const NavigationBar = () => {

    const [changeButton, setChangeButton] = useState(false)
    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate("/auth")
    }

    const handleWelcome = () => {
        navigate("/")
    }

    const handleSignOut = async() => {
        await signOut(auth)
        navigate("/auth")
    }

useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            setChangeButton(true)
        } else if(!user){
            setChangeButton(false)
        }
    })
}, [])

return (
    <Navbar variant="dark" bg="dark" sticky="top" expand="lg">
        <Container>
            <Navbar.Brand><strong className="navbar-title">My Simple Todoapp</strong></Navbar.Brand>
            <Navbar.Toggle />
            {changeButton
                ?
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <li className='signin-button'>
                            <button onClick={handleSignOut}>
                                Sign Out
                            </button>
                        </li>
                    </Navbar.Text>
                </Navbar.Collapse >
                :
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <li>
                            <Link to="home" spy={true} smooth={true} offset={50} duration={500} onClick={handleWelcome}>
                                Home
                            </Link>
                        </li>
                    </Navbar.Text>
                    <Navbar.Text>
                        <li>
                            <Link to="about" spy={true} smooth={true} offset={50} duration={500} onClick={handleWelcome}>
                                About
                            </Link>
                        </li>
                    </Navbar.Text>
                    <Navbar.Text>
                        <li>
                            <Link to="contact" spy={true} smooth={true} offset={50} duration={500} onClick={handleWelcome}>
                                Contact
                            </Link>
                        </li>
                    </Navbar.Text>
                    <Navbar.Text>
                        <li className='signin-button'>
                            <button onClick={handleRedirect}>
                                Get Started
                            </button>
                        </li>
                    </Navbar.Text>
                </Navbar.Collapse >}
        </Container >
    </Navbar >
)
}

export default NavigationBar