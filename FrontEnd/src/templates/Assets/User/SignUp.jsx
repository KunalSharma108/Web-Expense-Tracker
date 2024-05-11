import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import { useState } from 'react';
import { auth } from '../Auth/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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
    const [isChecked, setIsChecked] = useState(false);
    const [err, setErr] = useState({
        userErr: false,
        emailErr: false,
        passErr: false,
        robotErr: false
    })

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        if (email.trim() == '' || password.trim() == '' || username.trim() == '') {
            if (username.trim() == '') {
                setErr({
                    userErr: true,
                    emailErr: false,
                    passErr: false,
                    robotErr: false
                })
            } else if (email.trim() == '') {
                setErr({
                    userErr: false,
                    emailErr: true,
                    passErr: false,
                    robotErr: false
                })
            } else if (password.trim() == '') {
                setErr({
                    userErr: false,
                    emailErr: false,
                    passErr: true,
                    robotErr: false
                })
            }
        } else if (isChecked == false) {
            setErr({
                userErr: false,
                emailErr: false,
                passErr: false,
                robotErr: true
            })
        } else {
            if (password.length < 6) {
                setErr({
                    userErr: false,
                    emailErr: false,
                    passErr: true,
                    robotErr: false
                })
            } else {
                try {
                    console.log(`email : ${email}      password : ${password}`)
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((usercredentials) => console.log(usercredentials))
                        .catch((Error) => {
                            if (Error.code == 'auth/invalid-email') {
                                console.log("Invalid email!");
                                setErr({
                                    userErr: false,
                                    emailErr: true,
                                    passErr: true,
                                    robotErr: false
                                });
                            } 
                        })

                } catch (error) {
                    console.log(error)
                    setErr({
                        userErr: false,
                        emailErr: true,
                        passErr: true,
                        robotErr: false
                    })
                }
            }
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
                        <form action="">

                            {err.userErr == true ? (
                                <div className="text-danger warning">
                                    Username is required.
                                </div>
                            ) : null}
                            <div className="input-main">
                                <div className="input-logo"><i className="fa-solid fa-user"></i></div>
                                <input type="text" name="username" id="username" placeholder='Enter Your Username' className='input email-input' value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>

                            {err.emailErr == true ? (
                                <div className="text-danger warning">
                                    Invalid Email.
                                </div>
                            ) : null}
                            <div className="input-main">
                                <div className="input-logo"><i className="fa-regular fa-envelope"></i></div>
                                <input type="email" name="email" id="email" placeholder='Enter Your Email' className='input email-input' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>

                            {err.passErr == true ? (
                                <div className="text-danger warning">
                                    Password should be more than 6 characters.
                                </div>
                            ) : null}
                            <div className="input-main">
                                <div className="input-logo pass-logo" onClick={togglePassEye}>
                                    {passVisible == false ? (<i className="fa-solid fa-eye-slash"></i>) : (<i className="fa-solid fa-eye"></i>)}
                                </div>
                                <input type={passVisible == false ? 'password' : 'text'} name="password" id="password" placeholder='Enter Your Password' className='input password-input' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>

                            <Link className="change-form-div" to={'/User/SignIn'}>
                                Already have an account?
                            </Link>

                            {err.robotErr == true ? (
                                <div className="text-danger warning">
                                    We want no Robots!
                                </div>
                            ) : null}
                            <div className="check">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    className='checkbox'
                                    required
                                />
                                <label>
                                    I am not a Robot.
                                </label>
                            </div>
                            <div className="note">
                                <p>
                                    Note - Your privacy matters to us. We never share your email with any third-party, including spam companies. Your trust is our priority.
                                </p>
                            </div>
                            <div className='form-btn'>
                                <button className="btn btn-success" onClick={handleSignUp}>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
