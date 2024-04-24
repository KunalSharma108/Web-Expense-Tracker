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
import Learn from './templates/Assets/Learn/Learn';
import ExpenseWork from './templates/Assets/ExpenseWork/Expense-Work';
import ContactUs from './templates/Assets/ContactUs/ContactUs';
import Profile from './templates/Assets/profile/Profile';
import Footer from './templates/Assets/footer/footer';
import SignUp from './templates/Assets/User/SignUp';
import SignIn from './templates/Assets/User/SignIn';
import Home from './templates/Assets/Home/Home';

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

      if (cookieObject['username'] && cookieObject['email'] && cookieObject['password'] && cookieObject['login']) {
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
                  <Navbar learnActive='' meActive='' cuActive='' pfActive='' disabled={data == 'empty' ? "disabled" : ""} />
                  <Home cookie={data == 'empty' ? false : data} />
                  <Footer
                    Link0='why' linkName0='Benefits'
                    Link1='keyf' linkName1='Features'
                    Link2='techUsed' linkName2='Tech Used'
                    Link3='techUsed' linkName3='React'
                    Link4='techUsed' linkName4='Firebase'
                    Link5='aboutUs' linkName5='About Us'                    
                     />
                </>

              ) : backEndonline == 'loadingDone' ? <Loading class='startAnimation' /> : <Offline />
            }></Route>

            <Route path="/expense-work" element={
              backEndonline == 'loading' ? <Loading class='' /> : backEndonline == true ? (

                <>
                  <Navbar learnActive='' meActive='active' cuActive='' pfActive='' disabled={data == 'empty' ? "disabled" : ""} />
                  <ExpenseWork />
                  <Footer />
                </>

              ) : backEndonline == 'loadingDone' ? <Loading class='startAnimation' /> : <Offline />
            }></Route>

            <Route path="/ContactUs" element={
              backEndonline == 'loading' ? <Loading class='' /> : backEndonline == true ? (

                <>
                  <Navbar learnActive='' meActive='' cuActive='active' pfActive='' disabled={data == 'empty' ? "disabled" : ""} />
                  <ContactUs />
                  <Footer />
                </>

              ) : backEndonline == 'loadingDone' ? <Loading class='startAnimation' /> : <Offline />
            }></Route>

            <Route path="/Profile" element={
              backEndonline == 'loading' ? <Loading class='' /> : backEndonline == true ? (

                <>
                  <Profile />
                  <Footer />
                </>

              ) : backEndonline == 'loadingDone' ? <Loading class='startAnimation' /> : <Offline />
            }></Route>

            <Route path="/User-Guide" element={
              backEndonline == 'loading' ? <Loading class='' /> : backEndonline == true ? (

                <>
                  <Navbar learnActive='active' meActive='' cuActive='' pfActive='' disabled={data == 'empty' ? "disabled" : ""} />
                  <Learn />
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
