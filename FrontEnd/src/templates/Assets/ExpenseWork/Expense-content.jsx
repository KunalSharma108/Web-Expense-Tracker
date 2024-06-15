import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { database } from '../Auth/firebase';
import { ref, get } from 'firebase/database';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ExpenseContent({ currentTracker }) {
  const navigate = useNavigate();
  const [selectedTrackerData, setSelectedTrackerData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserIdFromEmail = () => {
    const email = Cookies.get('Email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && emailPattern.test(email)) {
      return email.split('@')[0];
    }

    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentTracker) {
        setLoading(true); // Show loading screen
        let Email = getUserIdFromEmail();
        if (!Email) {
          window.alert('There was a problem with your Email, Need to sign out urgently.');
          Cookies.remove('displayName');
          Cookies.remove('Email');
          window.location.reload();
          navigate('/');
          return;
        }

        try {
          const snapshot = await get(ref(database, `Users/${Email}/Tracker/${currentTracker}/expenseData`));
          const data = snapshot.val();

          // Simulate loading for at least 0.5 seconds
          await new Promise(resolve => setTimeout(resolve, 500));

          setSelectedTrackerData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); // Hide loading screen
        }
      } else {
        setSelectedTrackerData(null);
      }
    };

    fetchData();
  }, [currentTracker, navigate]);

  return (
    <div className='expense-main'>
      {loading && (
        <div className='loading-parent'>
          <div className='loading'>
          </div>
        </div>
      )}
      {!loading && selectedTrackerData != null && (

        <div className='expense-main-div'>
          <div className="expense-header">
            <div className="expense-header-name">
              {currentTracker}
            </div>
            {JSON.stringify(selectedTrackerData)}
          </div>
        </div>
        
      )}
      {!loading && selectedTrackerData == null && (
        <div className='loading-parent'>
          <div className="expense-not-loaded-content">
            Nothing is selected or loaded yet.
          </div>
        </div>
      )}
    </div>
  );
}

ExpenseContent.propTypes = {
  currentTracker: PropTypes.string,
};

export default ExpenseContent;
