import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import dollorIcon from '../templates/Assets/images/dollor-icon.png'

function Navbar(props) {
  const name = Cookies.get('displayName');
  const email = Cookies.get('Email');

  const navigate = useNavigate();
  const handleSignOut = () => {
    try {
      Cookies.remove('displayName');
      Cookies.remove('Email');
      window.location.reload();
      navigate('/')
    } catch (error) {
      console.log(`There was an error : ${error}`)
      window.alert('There was a problem signing out, Try again later!')
    }
  }

  const signUpbutton = (
    <Link className="right-container" to={'/user/SignUp'}>
      <i className="fa-solid fa-user-plus"></i>
      <div className="content">Sign Up</div>
    </Link>
  )

  const logOutbutton = (
    <Link className="right-container" to={'/user/SignUp'}>
      <div className="pfp"></div>
      <div className="content">Log Out</div>
    </Link>
  )

  let clickable = '';

  try {
    if (!name && !email) {
      clickable = 'disabled';
    }
  } catch (error) {
    clickable = ''
    console.log(`There was an error ${error}`)
  }

  let loggedIn = false;

  try {
    if (name && email) {
      loggedIn = true;
    } else {
      loggedIn = false
    }
  } catch (error) {
    loggedIn = false
    console.log(`There was an error ${error}`)
  }


  return (
    <nav className="navbar navbar-expand-lg bg-success border-body" data-bs-theme="dark">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div>
          <Link className="navbar-brand" to={'/'}>
            <img src={`${dollorIcon}`} alt="" width={'60px'} height={'60px'} />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link roboto-black ${props.meActive} ${clickable}`} to={'/expense-work'}>Manage Expenses</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link roboto-black ${props.cuActive} ${clickable} `} to={'/ContactUs'}>Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className='logout' title='Sign Out' onClick={handleSignOut}>
          {
            loggedIn ? (
              <>
                <i className="fa-solid fa-right-from-bracket" onClick={handleSignOut}></i>
              </>
            ) : null
          }
        </div>
      </div>
    </nav>

  )
}

export default Navbar
