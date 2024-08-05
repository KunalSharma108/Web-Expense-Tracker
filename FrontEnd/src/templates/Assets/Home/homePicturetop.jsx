import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function homePicturetop(props) {
  return (
    <div className="home-big-pic">
      <div className="home-big-pic-content">
        <div className="logo ">
          <img src="src\templates\Assets\images\dollor-icon.png" alt="" width={'200px'} height={'200px'} />
        </div>
        <div className="home-heading titillium-web-heavy">Expense Manager</div>
        <div className="home-sub-heading titillium-web-light">-Take Control of Your Finances with Ease-</div>
        <div className="button-row">
          {props.Data.displayName == false || props.Data.Email == false ? (
            <Link className="button text-light mx-3 titillium-web-heavy" to={'/user/SignUp'}>Get Started Today</Link>
          ) : <Link className="button text-light mx-3 titillium-web-heavy " to={'/expense-work'}>Manage Expenses</Link>
          }

        </div>
      </div>
    </div>
  )
}

export default homePicturetop

