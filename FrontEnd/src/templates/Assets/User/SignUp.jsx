import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Auth/firebase';


function SignUp() {

    const [passVisible, setPassVisible] = useState(false);

    const togglePassEye = () => {
        if (passVisible == false) {
            setPassVisible(true)
        } else if (passVisible == true) {
            setPassVisible(false)
        }
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();

        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((usercredentials) => console.log(usercredentials))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="sign-body-div">
            <div className="sign-div">
                <div className="sign-content">
                    <div className="sign-head">
                        Sign Up
                    </div>
                    <div className="sign-form">
                        <div className="input-main">
                            <div className="input-logo"><i class="fa-solid fa-user"></i></div>
                            <input type="email" name="email" id="email" className='input email-input' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-main">
                            <div className="input-logo" onClick={togglePassEye}>
                                {passVisible == false ? (<i class="fa-solid fa-eye-slash"></i>) : (<i class="fa-solid fa-eye"></i>)}
                            </div>
                            <input type={passVisible == false ? 'password' : 'text'} name="password" id="password" className='input password-input' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="button">
                            <div className="form-btn" onClick={handleSignUp}>Sign Up</div>
                        </div>
                    </div>
                    <Link className="change-form-div" to={'/User/SignIn'}>
                        Already have an account? Sign In right now!
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
