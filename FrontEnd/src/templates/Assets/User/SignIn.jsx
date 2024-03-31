import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

function SignIn() {

    const buttonStyle = {
        width: 'fit-content',
        height: 'fit-content',
        padding: '10px 22px',
        fontSize: '25px'
    }

    return (
        <div className='body-div my-3'>
            <div className="vertical-center">
                <div className="btn-group p-3 vertical-center" role="group" aria-label="Sign up and Sign in buttons" style={buttonStyle} >
                    <Link
                        type="button" style={buttonStyle} className={`btn btn-dark border border-white`} to={'/User/Sign-Up'}>
                        Sign Up
                    </Link>

                    <Link
                        type="button" style={buttonStyle} className={`btn btn-dark border border-white bg-warning`} to={'/User/Sign-In'}>
                        Sign In
                    </Link>
                </div>
            </div>

            <div className="flex-center" data-bs-theme="dark">
                <div className="container" data-bs-theme="dark">
                    <form className='container data-bs-theme="dark"'>
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

export default SignIn
