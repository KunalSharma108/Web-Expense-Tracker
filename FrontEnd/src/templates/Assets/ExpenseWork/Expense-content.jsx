import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { database } from '../Auth/firebase';
import { ref, get, update } from 'firebase/database';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ExpenseContent({ currentTracker }) {
  const navigate = useNavigate();
  const [selectedTrackerData, setSelectedTrackerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogState, setDialogState] = useState('');
  const [rowName, setRowName] = useState('');
  const [rowQuantity, setRowQuantity] = useState('');
  const [rowPrice, setRowPrice] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');
  const [loadingEdit, setLoadingEdit] = useState(false)

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
          window.alert(
            'There was a problem with your Email, Need to sign out urgently.'
          );
          Cookies.remove('displayName');
          Cookies.remove('Email');
          window.location.reload();
          navigate('/');
          return;
        }

        try {
          const snapshot = await get(
            ref(
              database,
              `Users/${Email}/Tracker/${currentTracker}/expenseData`
            )
          );
          const data = snapshot.val();

          await new Promise((resolve) => setTimeout(resolve, 500));

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
    window.alert('Delete button clicked');
  };

  useEffect(() => {
    if (selectedTrackerData && selectedTrackerData[selectedIndex]) {
      setRowName(selectedTrackerData[selectedIndex].Name || '');
      setRowPrice(selectedTrackerData[selectedIndex].Price || '');
      setRowQuantity(selectedTrackerData[selectedIndex].Quantity || '');
    }

  }, [selectedTrackerData, selectedIndex]);


  useEffect(() => {
    if (dialogState == 'edit') {
      const allValuesPresent = rowName !== '' && rowPrice !== '' && rowQuantity !== '';
  
      if (allValuesPresent) {
        setLoadingEdit(false);
      }
    }
  }, [rowName, rowPrice, rowQuantity]);



  const handleEditOpenDialog = async (index) => {
    setDialogState('edit')
    setSelectedIndex(index)
  };

  useEffect(() => {
    if (dialogState == 'edit') {
      const allValues = rowName !== '' && rowPrice !== '' && rowQuantity !== '';

      if (allValues) {
        setLoadingEdit(false)
      }
    }
  }, [rowName, rowPrice, rowQuantity])

  const handleAddOpenDialog = () => {
    setDialogState('add')
  }

  const editRow = () => {
    // TODO : Edit the data in firebase database. Make sure to clean up the hooks after the edit is done. 
    // TODO : Good luck for mental torture for next 3 hours straight *thumpbs up emoji*
  }

  const addRow = async () => {
    let newRow = {
      Name: rowName,
      Quantity: rowQuantity,
      Price: rowPrice,
    };

    let Email = getUserIdFromEmail();
    if (!Email) {
      window.alert('There was a problem with your Email, need to sign out urgently.');
      Cookies.remove('displayName');
      Cookies.remove('Email');
      window.location.reload();
      navigate('/');
      return;
    }

    let newValue = [...selectedTrackerData, newRow];

    const updatedRow = {};
    updatedRow[`Users/${Email}/Tracker/${currentTracker}/expenseData`] = newValue;

    try {
      await update(ref(database), updatedRow);
      setSelectedTrackerData(newValue);

      setRowName('')
      setRowQuantity('')
      setRowPrice('')

    } catch (error) {
      window.alert('Failed to add row. Please try again.');
    }
  };

  const handleCloseDialog = () => {
    setDialogState('')
  }

  const handleSave = () => {
    if (rowName == '' || rowQuantity == '' || rowPrice == '') {
      window.alert("No Value can be empty.")
      return;
    }

    if (dialogState == 'add') {
      addRow();
    } else if (dialogState == 'edit') {
      editRow();
    } else {
      window.alert('An error occured')
      window.location.reload();
    }
    setDialogState('')
  }

  return (
    <div className="expense-main">
      {loading && (
        <div className="loading-parent">
          <div className="loading"></div>
        </div>
      )}
      {!loading && selectedTrackerData != null && (
        <div className="expense-main-div">
          <div className="expense-content">
            <div className="table-wrapper">
              <div className="toolbar">
                <div className="Tname">{currentTracker}</div>
                <div className="Ttools" onClick={handleAddOpenDialog}>
                  <div className="tool plus-tool" title="Add Row">
                    +
                  </div>
                </div>
              </div>
              <table className="expense-table">
                <thead>
                  <tr>
                    <th className="col-serial">Serial No.</th>
                    <th className="col-name">Name</th>
                    <th className="col-quantity">Quantity</th>
                    <th className="col-price">Price</th>
                    <th className="col-total">Total</th>
                    <th className="col-edit"></th>
                    <th className="col-delete"></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTrackerData.map((item, index) => (
                    <tr key={index}>
                      <td className="col-serial">{index + 1}</td>
                      <td className="col-name">{item.Name}</td>
                      <td className="col-quantity">{item.Quantity}</td>
                      <td className="col-price">{item.Price}</td>
                      <td className="col-total">{item.Quantity * item.Price}</td>
                      <td className="col-edit">
                        <div
                          className="tracker-edit"
                          title="Edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditOpenDialog(index);
                          }}
                        >
                          <i
                            className="fa-regular fa-pen-to-square"
                            title="Edit"
                          ></i>
                        </div>
                      </td>
                      <td className="col-delete">
                        <div
                          className="tracker-delete"
                          title="Delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTracker();
                          }}
                        >
                          <i className="fa-solid fa-trash" title="Delete"></i>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={`custom-dialog ${dialogState != '' ? "show" : "hide"}`}>
            <div className="dialog-content">
              <div className="dialog-head expense-dialog-head">
                {dialogState == 'edit' ? 'Edit Row' : dialogState == 'add' ? 'Add Row' : ''}
              </div>
              <div className="dialog-input">
                {dialogState == 'edit' ? (

                  <>
                    {loadingEdit ? (
                      <div className="loading-parent">
                        <div className="loading"></div>
                      </div>
                    ) : (
                      <>
                        <input
                          type="text"
                          className="tracker-input"
                          id="tracker-input"
                          placeholder='Name'
                          value={rowName}
                          onChange={(e) => setRowName(e.target.value)}
                        />

                        <input
                          type="number"
                          className="tracker-input"
                          id="tracker-input"
                          placeholder='quantity'
                          value={rowQuantity}
                          onChange={(e) => setRowQuantity(e.target.value)}
                        />

                        <input
                          type="number"
                          className="tracker-input"
                          id="tracker-input"
                          placeholder='price'
                          value={rowPrice}
                          onChange={(e) => setRowPrice(e.target.value)}
                        />
                      </>
                    )}

                  </>
                ) : dialogState == 'add' ? (
                  <>
                    <input
                      type="text"
                      className="tracker-input"
                      id="tracker-input"
                      placeholder='Name'
                      value={rowName}
                      onChange={(e) => setRowName(e.target.value)}
                    />

                    <input
                      type="number"
                      className="tracker-input"
                      id="tracker-input"
                      placeholder='quantity'
                      value={rowQuantity}
                      onChange={(e) => setRowQuantity(e.target.value)}
                    />

                    <input
                      type="number"
                      className="tracker-input"
                      id="tracker-input"
                      placeholder='price'
                      value={rowPrice}
                      onChange={(e) => setRowPrice(e.target.value)}
                    />
                  </>
                ) : ''}
              </div>
              <div className="btn-container">
                <button onClick={handleSave} className="save-btn button">Save</button>
                <button onClick={handleCloseDialog} className="cancel-btn button">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && selectedTrackerData == null && (
        <div className="loading-parent">
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
