import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { database } from '../Auth/firebase';
import { ref, get } from 'firebase/database';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ExpenseContent({ currentTracker }) {
  const navigate = useNavigate();
  const [selectedTrackerData, setSelectedTrackerData] = useState([]);
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
        setLoading(true);
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

          await new Promise(resolve => setTimeout(resolve, 500));

          setSelectedTrackerData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSelectedTrackerData(null);
      }
    };

    fetchData();
  }, [currentTracker, navigate]);

  const deleteTracker = () => {
    window.alert('Delete button clicked')
  }
  
  const handleEditOpenDialog = () => {
    window.alert('Edit button clicked')
  }

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
          <div className="expense-content">
            <div className="table-wrapper">
              <div className="toolbar">
                <div className='Tname'>{currentTracker}</div>
                <div className='Ttools'>
                  <div className="tool">Add Row</div>
                  <div className="tool">Delete</div>
                </div>
              </div>
              <table className="expense-table">
                <thead>
                  <tr>
                    <th>Serial No.</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTrackerData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.Item}</td>
                      <td>{item.Amount}</td>
                      <td>{item.Price}</td>
                      <td>{item.Amount * item.Price}</td>
                      <td>
                        <div className="tracker-edit" title="Edit" onClick={(e) => {
                          e.stopPropagation();
                          handleEditOpenDialog();
                        }}>
                          <i className="fa-regular fa-pen-to-square" title="Edit"></i>
                        </div>
                      </td>
                      <td>
                        <div className="tracker-delete" title="Delete" onClick={(e) => {
                          e.stopPropagation();
                          deleteTracker();
                        }}>
                          <i className="fa-solid fa-trash" title="Delete"></i>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
