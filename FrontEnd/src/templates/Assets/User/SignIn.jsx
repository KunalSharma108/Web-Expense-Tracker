import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";

import { useState } from 'react';
import { app } from '../Auth/firebase';
import { createUserWithEmailAndPassword, updateProfile, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import Cookies from 'js-cookie';


function SignUp() {
    const Navigate = useNavigate();
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
    const [isChecked, setIsChecked] = useState(false);
    const [err, setErr] = useState({
        emailErr: false,
        passErr: false,
        robotErr: false,
    })

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (email.trim() == '' || password.trim() == '') {
            if (username.trim() == '') {
                setErr({
                    emailErr: false,
                    passErr: false,
                    robotErr: false,
                })
            } else if (email.trim() == '') {
                setErr({
                    emailErr: true,
                    passErr: false,
                    robotErr: false,
                })
            } else if (password.trim() == '') {
                setErr({
                    emailErr: false,
                    passErr: true,
                    robotErr: false,
                })
            }
        } else if (isChecked == false) {
            setErr({
                emailErr: false,
                passErr: false,
                robotErr: true,
            })
        } else {
            if (password.length < 6) {
                setErr({
                    emailErr: false,
                    passErr: true,
                    robotErr: false,
                })
            } else {
                try {
                    const auth = getAuth(app);
                    signInWithEmailAndPassword(auth, email, password).then(async (userCredentials) => {
                        try {
                            document.cookie = `displayName=${userCredentials.user.displayName}`;
                            document.cookie = `Email=${userCredentials.user.email}`;

                            Navigate('/')
                            window.location.reload();

                        } catch (error) {
                            console.log(`There was an error : ${error}`)
                            signOut()
                            window.alert('Something went wrong!')
                        }
                    })
                        .catch((Error) => {
                            if (Error.code == 'auth/invalid-email') {
                                setErr({
                                    emailErr: true,
                                    passErr: true,
                                    robotErr: false,
                                });
                            } else if (Error.code == 'auth/user-not-found') {
                                setErr({
                                    emailErr: true,
                                    passErr: true,
                                    robotErr: false,
                                });
                            } else {
                                setErr({
                                    emailErr: true,
                                    passErr: true,
                                    robotErr: false,
                                });
                            }
                        })

                } catch (error) {
                    console.log(error)
                    console.log('this')
                    setErr({
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
                        Welcome Back!
                    </div>
                    <div className="sign-form signIn-form">
                        <form action="">

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
                                    Password is incorrect!
                                </div>
                            ) : null}
                            <div className="input-main">
                                <div className="input-logo pass-logo" onClick={togglePassEye}>
                                    {passVisible == false ? (<i className="fa-solid fa-eye-slash"></i>) : (<i className="fa-solid fa-eye"></i>)}
                                </div>
                                <input type={passVisible == false ? 'password' : 'text'} name="password" id="password" placeholder='Enter Your Password' className='input password-input' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>

                            <Link className="change-form-div" to={'/User/SignUp'}>
                                Dont have an account?
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
                        </form>
                    </div>
                    <div className='form-btn'>
                        <button className="btn btn-success" onClick={handleSignIn}>Log In</button>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default SignUp
