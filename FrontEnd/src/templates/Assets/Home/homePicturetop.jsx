import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dollorIcon from '../images/dollor-icon.png'
import Cookies from 'js-cookie'

function homePicturetop(props) {
  const name = Cookies.get('displayName');
  const email = Cookies.get('Email');

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
    <div className="home-big-pic">
      <div className="home-big-pic-content">
        <div className="logo ">
          <img src={`${dollorIcon}`} alt="" width={'200px'} height={'200px'} />
        </div>
        <div className="home-heading titillium-web-heavy">Expense Manager</div>
        <div className="home-sub-heading titillium-web-light">-Take Control of Your Finances with Ease-</div>
        <div className="button-row">
          {loggedIn ? (
            <Link className="button text-light mx-3 titillium-web-heavy " to={'/expense-work'}>Manage Expenses</Link>
          ) : <Link className="button text-light mx-3 titillium-web-heavy" to={'/user/SignUp'}>Get Started Today</Link>
          }

        </div>
      </div>
    </div>
  )
}

export default homePicturetop

