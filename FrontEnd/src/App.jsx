import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './templates/loading';
import Offline from './templates/offline';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from './templates/Navbar';
import Home from './templates/Assets/Home/Home';
import ExpenseWork from './templates/Assets/ExpenseWork/Expense-Work';
import ContactUs from './templates/Assets/ContactUs/ContactUs';
import Profile from './templates/Assets/profile/Profile';
import Footer from './templates/Assets/footer/footer';
import SignUp from './templates/Assets/User/SignUp';
import SignIn from './templates/Assets/User/SignIn';




function App(props) {
  const [backEndonline, setBackendOnline] = useState('loading');
  const [data, setData] = useState('empty');

  const fetchData = async () => {
    let tries = 1;
    while (tries < 3) {
      try {
        const response = await axios.get('http://localhost:5000/isOnline');
        if (response.data === 'online') {
          setBackendOnline('loadingDone')
          setTimeout(() => {
            setBackendOnline(true);
          }, 2000);

          break;
        } else {
          setBackendOnline('loading');
          tries += 1;
          if (tries >= 3) {
            setBackendOnline(false);
          }
        }
      } catch (error) {
        console.log(`There was an error: ${error}`);
        setBackendOnline('loading');
        tries += 1;
        if (tries >= 3) {
          setBackendOnline(false);
        }
      }
    }
  };


  useEffect(() => {
    const cookie = document.cookie;
    if (cookie.trim() === '') {
      setData('empty');
    } else {
      const cookieArray = cookie.split(';');
      const cookieObject = {};

      cookieArray.forEach(cookie => {
        const [key, value] = cookie.split('=');
        cookieObject[key.trim()] = value.trim();
      });

      if (cookieObject['username'] && cookieObject['email'] && cookieObject['password']) {
        setData(cookieObject);
      }
      else {
        setData('empty')
      }
    }
    fetchData();

  }, []);

  return (
    <div className='body-div' >
      <Router>
        <div>
          <Routes>
            <Route path="/" element={
              backEndonline == 'loading' ? <Loading class='' /> : backEndonline == true ? (

                <>
                  <Navbar homeActive='active' meActive='' cuActive='' pfActive='' disabled={data == 'empty' ? "disabled" : ""}/>
                  <Home />
                  <Footer />                  
                </>

              ) : backEndonline == 'loadingDone' ? <Loading class='startAnimation' /> : <Offline />
            }></Route>

            <Route path="/Web" element={
              backEndonline == 'loading' ? <Loading class='' /> : backEndonline == true ? (

                <>
                  <Navbar homeActive='active' meActive='' cuActive='' pfActive='' disabled={data == 'empty' ? "disabled" : ""}/>
                  <Home />
                  <Footer />                  
                </>

              ) : backEndonline == 'loadingDone' ? <Loading class='startAnimation' /> : <Offline />
            }></Route>

            <Route path="/Web/expense-work" element={
              backEndonline == 'loading' ? <Loading class='' /> : backEndonline == true ? (

                <>
                  <Navbar homeActive='' meActive='active' cuActive='' pfActive='' disabled={data == 'empty' ? "disabled" : ""}/>
                  <ExpenseWork />
                  <Footer />                  
                </>

              ) : backEndonline == 'loadingDone' ? <Loading class='startAnimation' /> : <Offline />
            }></Route>

            <Route path="/Web/ContactUs" element={
              backEndonline == 'loading' ? <Loading class='' /> : backEndonline == true ? (

                <>
                  <Navbar homeActive='' meActive='' cuActive='active' pfActive='' disabled={data == 'empty' ? "disabled" : ""}/>
                  <ContactUs />
                  <Footer />                  
                </>

              ) : backEndonline == 'loadingDone' ? <Loading class='startAnimation' /> : <Offline />
            }></Route>

            <Route path="/Web/Profile" element={
              backEndonline == 'loading' ? <Loading class='' /> : backEndonline == true ? (

                <>
                  <Profile />
                  <Footer />                  
                </>

              ) : backEndonline == 'loadingDone' ? <Loading class='startAnimation' /> : <Offline />
            }></Route>

            <Route path='/user/SignUp' element={<SignUp />}></Route>
            <Route path='/user/SignIn' element={<SignIn />}></Route>


          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App;
