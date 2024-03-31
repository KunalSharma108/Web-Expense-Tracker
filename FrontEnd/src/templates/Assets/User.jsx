import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function User() {
  const [action, setAction] = useState('0')

  const handleSignUp = () => {
    setAction('0')
  };

  const handleSignIn = () => {
    setAction('1')
  };

  const buttonStyle = {
    width: 'fit-content',
    height: 'fit-content',
    padding: '10px 22px',
    fontSize: '25px'
  }

  return (
    <div className='body-div'>
      <div className="vertical-center">
        <div className="btn-group p-3 vertical-center" role="group" aria-label="Sign up and Sign in buttons" style={buttonStyle} >
          <Link
            type="button" onClick={handleSignUp} style={buttonStyle} className={`btn btn-dark border border-white ${action == '0' ? "bg-warning" : ""}`} to={'/User/Sign-Up'}>
            Sign Up
          </Link>

          <Link
            type="button" onClick={handleSignIn} style={buttonStyle} className={`btn btn-dark border border-white ${action == '1' ? "bg-warning" : ""}`} to={'/User/Sign-In'}>
            Sign In
          </Link>
        </div>
      </div>

      <div className="flex-center">
        <div className="container">
          <form className='container'>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-light">Email address</label>
              <input type="email" className="form-control bg-dark text-light" id="email" placeholder="Enter your email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-light">Password</label>
              <input type="password" className="form-control bg-dark text-light" id="password" placeholder="Enter your password" />
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default User
