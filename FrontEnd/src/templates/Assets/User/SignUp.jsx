import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import { useState } from 'react';
import { auth } from '../Auth/firebase';
import firebase from 'firebase/compat/app';


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
    const [username, setUsername] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();

        try {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((usercredentials) => console.log(usercredentials))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="sign-body-div">
            <div className="sign-div">
                <div className="sign-content">
                    <div className="sign-head roboto-black">
                        Join Us!
                    </div>
                    <div className="sign-form">
                        <div className="input-main">
                            <div className="input-logo"><i className="fa-solid fa-user"></i></div>
                            <input type="text" name="username" id="username" placeholder='Enter Your Username' className='input email-input' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="input-main">
                            <div className="input-logo"><i class="fa-regular fa-envelope"></i></div>
                            <input type="email" name="email" id="email" placeholder='Enter Your Email' className='input email-input' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-main">
                            <div className="input-logo pass-logo" onClick={togglePassEye}>
                                {passVisible == false ? (<i className="fa-solid fa-eye-slash"></i>) : (<i className="fa-solid fa-eye"></i>)}
                            </div>
                            <input type={passVisible == false ? 'password' : 'text'} name="password" id="password" placeholder='Enter Your Password' className='input password-input' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Link className="change-form-div" to={'/User/SignIn'}>
                            Already have an account?
                        </Link>
                        <div className="useless-stuff">
                            
                        </div>
                        <div className='form-btn'>
                            <div className="btn btn-success" onClick={handleSignUp}>Sign Up</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
