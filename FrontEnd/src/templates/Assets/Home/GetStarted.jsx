import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function GetStarted(props) {
    const loginContent = (
        <>
            Start Using our services right now and <Link className="btn btn-success" to={'/expense-work'}>Manage Expenses</Link>
        </>
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
                    {props.cookie['login'] == 'true' ? loginContent : SignUpContent}
                </div>
            </div>
        </div>
    )
}

GetStarted.propTypes = {

}

export default GetStarted

