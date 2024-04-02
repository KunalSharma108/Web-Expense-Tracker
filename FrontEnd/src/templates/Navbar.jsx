import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar(props) {
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
    
    return (
        <nav className="navbar navbar-expand-lg bg-success border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/Web'} >
                    <img src="\src\templates\Assets\images\dollor-icon.png" alt="" width={'60px'} height={'60px'} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link className={`nav-link roboto-black ${props.homeActive} `} aria-current="page" to={'/Web'}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link roboto-black ${props.meActive} ${props.disabled} `} to={'/Web/expense-work'}>Manage Expenses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link roboto-black ${props.cuActive} ${props.disabled} `} to={'/Web/ContactUs'}>Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link roboto-black ${props.pfActive} ${props.disabled} `} to={'/Web/Profile'}>My Profile</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
