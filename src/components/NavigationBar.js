import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import "../asset/css/navbar.css"

const NavigationBar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate("/")
            })
            .catch(err => { alert(err.message) })
    }

    return (
        <Navbar variant="dark" fixed='top'>
            <Container>
                <Navbar.Brand><strong className="navbar-title">Simple Todoapp</strong></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <button className='btn btn-outline-light navbar-button' onClick={handleLogout}>Logout</button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar