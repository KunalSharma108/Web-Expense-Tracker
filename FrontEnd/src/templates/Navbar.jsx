import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-primary border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/home'} >Web Expense Tracker</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={'/home'}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/expense-work'}>Manage Expenses</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Account
                            </div>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to={'/User/Sign-Up'}>Sign Up</Link></li>
                                <li><Link className="dropdown-item" to={'/User/Sign-In'}>Sign In</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to={'/User/My-Profile'}>My Profile</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
