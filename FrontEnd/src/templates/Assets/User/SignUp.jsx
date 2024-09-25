import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import { useState } from 'react';
import { app, database } from '../Auth/firebase';
import { createUserWithEmailAndPassword, updateProfile, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import Cookies from 'js-cookie';
import { onValue, push, ref, set, update } from 'firebase/database';


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
  const [username, setUsername] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [err, setErr] = useState({
    userErr: false,
    emailErr: false,
    passErr: false,
    robotErr: false,
    emailAlreadyInUse: false
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (email.trim() == '' || password.trim() == '' || username.trim() == '') {
      if (username.trim() == '') {
        setErr({
          userErr: true,
          emailErr: false,
          passErr: false,
          robotErr: false,
          emailAlreadyInUse: false
        })
      } else if (email.trim() == '') {
        setErr({
          userErr: false,
          emailErr: true,
          passErr: false,
          robotErr: false,
          emailAlreadyInUse: false
        })
      } else if (password.trim() == '') {
        setErr({
          userErr: false,
          emailErr: false,
          passErr: true,
          robotErr: false,
          emailAlreadyInUse: false
        })
      }
    } else if (isChecked == false) {
      setErr({
        userErr: false,
        emailErr: false,
        passErr: false,
        robotErr: true,
        emailAlreadyInUse: false
      })
    } else {
      if (password.length < 6) {
        setErr({
          userErr: false,
          emailErr: false,
          passErr: true,
          robotErr: false,
          emailAlreadyInUse: false
        })
      } else {
        try {
          const auth = getAuth(app);
          createUserWithEmailAndPassword(auth, email, password).then(async (userCredentials) => {
            try {
              const user = userCredentials.user;
              await updateProfile(user, {
                displayName: username
              });

              Cookies.set('displayName', userCredentials.user.displayName, { expires: 30 });
              Cookies.set('Email', userCredentials.user.email, { expires: 30 });

              const dummyItems = [
                'Books', 'Pencils', 'Chopsticks', 'Notebooks', 'Laptops', 'Water Bottles', 'Sunglasses', 'Headphones',
                'Coffee Mugs', 'Keychains', 'Umbrellas', 'Towels', 'Socks', 'T-shirts', 'Hats', 'Scarves', 'Gloves',
                'Wallets', 'Backpacks', 'Watches', 'Bracelets', 'Plates', 'Bowls', 'Cups', 'Spoons', 'Forks', 'Knives',
                'Toothbrushes', 'Toothpaste', 'Shampoo', 'Conditioner', 'Soap', 'Towels', 'Lotion', 'Sunscreen', 'Facial Cleanser',
                'Facial Moisturizer', 'Razors', 'Shaving Cream', 'Deodorant', 'Perfume', 'Cologne', 'Hairbrushes', 'Combs', 'Hair Gel',
                'Hair Spray', 'Hair Clips', 'Hair Ties', 'Hairbands', 'Bobby Pins', 'Hair Rollers', 'Hair Dryers', 'Straighteners',
                'Curling Irons', 'Mirrors', 'Lip Balm', 'Lipstick', 'Lip Gloss', 'Lip Liner', 'Eyeliner', 'Mascara', 'Eye Shadow',
                'Blush', 'Foundation', 'Concealer', 'Makeup Brushes', 'Nail Clippers', 'Nail Files', 'Nail Polish', 'Nail Polish Remover',
                'Cotton Balls', 'Cotton Swabs', 'Tweezers', 'Scissors', 'Bandages', 'First Aid Kit', 'Thermometer', 'Pain Relievers',
                'Cough Drops', 'Cough Syrup', 'Cold Medicine'
              ];

              const addUser = async (Email) => {
                const userKey = Email.toLowerCase().split('@')[0];
                const userRef = ref(database, 'Users/' + userKey + '/Tracker');

                try {
                  const randomIndex = Math.floor(Math.random() * dummyItems.length);
                  const randomItem = dummyItems[randomIndex];
                  const randomAmount = Math.floor(Math.random() * 100) + 1;

                  let item = {Name : randomItem, Price : randomAmount, Quantity: randomAmount}

                  await set(userRef, { Expenses: { expenseData: [ item ] } });
                } catch (error) {
                  console.error('Error adding random expense:', error);
                }
              };

              await addUser(email);
              Navigate('/');
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
                  userErr: false,
                  emailErr: true,
                  passErr: true,
                  robotErr: false,
                  emailAlreadyInUse: false
                });
              } else if (Error.code == 'auth/email-already-in-use') {
                setErr({
                  userErr: false,
                  emailErr: false,
                  passErr: false,
                  robotErr: false,
                  emailAlreadyInUse: true
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
              ) : err.emailAlreadyInUse == true ? (
                <div className="text-danger warning">
                  Email already in use.
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
      </div >
    </div >
  )
}

export default SignUp
