import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';

function GetStarted(props) {
  const name = Cookies.get('displayName');
  const email = Cookies.get('Email');

  const loginContent = (
    <div>
      <div className='keyword'> Effecient tracking, Statistics of your Expenses and More!</div> <div>Start Using our services right now and <Link className="btn btn-success mx-1" to={'/expense-work'}>Manage Expenses</Link></div>
    </div>
  )

  const SignUpContent = (
    <>
      Start Using our services right now and <Link className="btn btn-success disabled" to={'/expense-work'}>Manage Expenses</Link> <i>Oops!</i> Looks like you are not signed Up, <Link className="btn btn-primary" to={'/user/SignUp'}>Sign Up</Link> right now.
    </>
  )

  return (
    <div className="gs-main">
      <div className="gs-content">
        <div className="gs-head">
          Get Started
        </div>
        <div className="gs-p-content">
          {!name && !email ? SignUpContent : loginContent}
        </div>
      </div>
    </div>
  )
}

GetStarted.propTypes = {

}

export default GetStarted

