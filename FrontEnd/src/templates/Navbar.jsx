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
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div>
                    <Link className="navbar-brand" to={'/'}>
                        <img src="\src\templates\Assets\images\dollor-icon.png" alt="" width={'60px'} height={'60px'} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link roboto-black ${props.learnActive}`} aria-current="page" to={'/User-Guide'}>User Guide</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link roboto-black ${props.meActive} ${props.disabled.displayName == false || props.disabled.Email == false ? "disabled" : ''} `} to={'/expense-work'}>Manage Expenses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link roboto-black ${props.cuActive} ${props.disabled.displayName == false || props.disabled.Email == false ? "disabled" : ''} `} to={'/ContactUs'}>Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link roboto-black ${props.pfActive} ${props.disabled.displayName == false || props.disabled.Email == false ? "disabled" : ''} `} to={'/Profile'}>My Profile</Link>
                        </li>
                    </ul>
                </div>
                <div className='logout' title='Sign Out'>
                    {props.disabled.displayName != false && props.disabled.Email != false ? (
                        <>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </>
                    ) : null
                    }
                </div>
            </div>
        </nav>

    )
}

export default Navbar
