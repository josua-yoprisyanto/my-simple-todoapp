import React, { useState, useEffect } from 'react'
import '../asset/css/auth.css'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Authentication = () => {

  const [changeForm, setChangeForm] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorLogin, setErrorLogin] = useState(false)
  const [errorRegister, setErrorRegister] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/Home")
      })
      .catch(() => {
        setErrorLogin(true)
      })
  }


  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setErrorRegister(true)
      setErrorMessage("Password and Confirm Password Not Match")
      return
    } else if(email == "" || password == "" || confirmPassword == ""){
      setErrorRegister(true)
      setErrorMessage("email/password empty")
      return
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/home")
      })
      .catch(()=>{
        setErrorRegister(true)
        setErrorMessage("email already exist")
      })
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home")
      }
    })
  }, [])


  return (
    <div className='auth-body'>
      {loading ? 
        changeForm ?
          <div className='auth-box-register'>
            <h1>Register</h1>
            {errorRegister && <span style={{ color: "red" }}>{errorMessage}</span>}
            <form onSubmit={handleRegister}>
              <input
                type="email"
                className="mt-3 auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
              <input
                type="password"
                className=" mt-3 auth-input"
                minLength="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
              <input
                type="password"
                className=" mt-3 auth-input"
                minLength="8"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm Password'
              />
              <button className="btn btn-outline-light mt-3 mb-3 auth-button">Register</button>
            </form>
            <span>Already Have Account? <a onClick={() => setChangeForm(false)} className="change-button">Login</a> Here</span>
          </div>
          :
          <div className='auth-box-login'>
            <h1>Login</h1>
            {errorLogin && <span style={{ color: "red" }}>Login Failed</span>}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                className="mt-3 auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
              <input
                type="password"
                className="mt-3 auth-input"
                minLength="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
              <button className="btn btn-outline-light mt-3 mb-3 auth-button">Login</button>
            </form>
            <span>Don't Have Account? <a onClick={() => setChangeForm(true)} className="change-button">Register</a> Here</span>
          </div>
          : 
          <h1>Loading...</h1>
        }
    </div>
  )
}

export default Authentication