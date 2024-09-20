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
import ExpenseWork from './templates/Assets/ExpenseWork/Expense-Work';
import ContactUs from './templates/Assets/ContactUs/ContactUs';
import Footer from './templates/Assets/footer/footer';
import SignUp from './templates/Assets/User/SignUp';
import SignIn from './templates/Assets/User/SignIn';
import Home from './templates/Assets/Home/Home';
import { child, get, getDatabase, ref } from 'firebase/database';

function App(props) {
  const [backEndonline, setBackendOnline] = useState('loading');
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const db = getDatabase();
      const snapshot = await get(ref(db, "Users"))

      if (snapshot.exists()) {
        setBackendOnline("loadingDone");
        setTimeout(() => {
          setBackendOnline(true);
        }, 500);
      } else {
        setBackendOnline(false);
      }
    } catch (error) {
      console.log(`There was an error: ${error}`);
      setBackendOnline(false);
    }
  };

  const fetchCookie = () => {
    const filterCookie = (obj, keysToKeep) => {
      let filterArray = {}

      keysToKeep.forEach(key => {
        if (obj.hasOwnProperty(key)) {
          filterArray[key] = obj[key];
        } else {
          filterArray[key] = false;
        }
      });

      return filterArray;
    }
    let cookie = document.cookie;

    if (cookie.trim() !== '') {
      let cookieArray = cookie.split(';');
      let cookieObject = {}

      cookieArray.forEach(cookie => {
        const [key, value] = cookie.split('=');
        cookieObject[key.trim()] = value.trim();
      })

      cookieObject = filterCookie(cookieObject, ['displayName', 'Email'])
      setData(cookieObject)
    }
  }

  useEffect(() => {
    fetchCookie();
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
                  <Navbar learnActive='' meActive='' cuActive='' pfActive='' disabled={data} />
                  <Home Data={data} />
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
                  <Navbar learnActive='' meActive='active' cuActive='' pfActive='' disabled={data} />
                  <ExpenseWork />
                  <Footer />
                </>

              ) : backEndonline == 'loadingDone' ? <Loading class='startAnimation' /> : <Offline />
            }></Route>

            <Route path="/ContactUs" element={
              backEndonline == 'loading' ? <Loading class='' /> : backEndonline == true ? (

                <>
                  <Navbar learnActive='' meActive='' cuActive='active' pfActive='' disabled={data} />
                  <ContactUs />
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
