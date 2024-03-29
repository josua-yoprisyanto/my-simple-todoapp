import React, { useEffect } from 'react'
import '../asset/css/welcome.css'
import { WelcomeHeader, WelcomeFooter, WelcomeContent } from '../components/welcome'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/NavigationBar'

const Welcome = () => {

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/dashboard")
      }
    })
  }, [])
  return (
    <>
      <Navbar />
      <div className="welcome-page" >
        <WelcomeHeader />
        <WelcomeContent />
        <WelcomeFooter />
      </div>
    </>
  )
}

export default Welcome