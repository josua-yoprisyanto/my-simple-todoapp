import React, { useEffect, useState } from "react";
import "../asset/css/auth.css";
import { GoogleButton } from "react-google-button";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import auth1Image from "../asset/images/auth1.png";
import auth2Image from "../asset/images/auth2.png";
import Navbar from "../components/NavigationBar";

const Authentication = () => {
  const [changeForm, setChangeForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setIsError(true);
      setErrorMessage("Login Failed");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setIsError(true);
      setErrorMessage("Password and Confirm Password Not Same");
      return;
    } else if (email === "" || password === "" || confirmPassword === "") {
      setIsError(true);
      setErrorMessage("Email/Password Empty");
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setIsError(true);
      setErrorMessage("Account Already Exist");
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/dashboard");
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-img">
          <img src={auth2Image} />
        </div>
        {changeForm ? (
          <div div className="auth-form">
            <h2>
              <strong>Sign In</strong>
            </h2>
            {isError && (
              <span className="mt-2 mb-2" style={{ color: "red" }}>
                {errorMessage}
              </span>
            )}
            <GoogleButton
              onClick={signInWithGoogle}
              style={{
                width: "300px",
                color: "black",
                backgroundColor: "white",
              }}
            />
            <form className="mt-3" onSubmit={handleSignIn}>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                minLength="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-dark mb-3">Sign In</button>
            </form>
            <span>
              Don't have account?{" "}
              <a onClick={() => setChangeForm(false)}>
                <strong>Sign Up</strong>
              </a>{" "}
              Here
            </span>
          </div>
        ) : (
          <div className="auth-form">
            <h2>
              <strong>Sign Up</strong>
            </h2>
            {isError && (
              <span className="mt-2 mb-2" style={{ color: "red" }}>
                {errorMessage}
              </span>
            )}
            <GoogleButton
              onClick={signInWithGoogle}
              style={{
                width: "300px",
                color: "black",
                backgroundColor: "white",
              }}
            />
            <form className="mt-3 mb-2" onSubmit={handleSignUp}>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                minLength="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                minLength="8"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="btn btn-dark mb-2">Sign Up</button>
            </form>
            <span>
              Already have account?{" "}
              <a onClick={() => setChangeForm(true)}>
                <strong>Sign In</strong>
              </a>{" "}
              Here
            </span>
          </div>
        )}
        <div className="auth-img">
          <img src={auth1Image} />
        </div>
      </div>
    </>
  );
};

export default Authentication;
