import React, { useState } from 'react';
import { database } from '../Auth/firebase';

function Sidebar(props) {
  const [showDialog, setShowDialog] = useState(false);
  const [trackerName, setTrackerName] = useState('');

  const buildTracker = (TrackerName) => {

    const iconArray = [
      (<i className="fas fa-calendar-minus"></i>),
      (<i className="fas fa-money-bill-trend-up"></i>),
      (<i className="fas fa-coins"></i>),
      (<i className="fas fa-hand-holding-usd"></i>),
      (<i className="fas fa-piggy-bank"></i>),
      (<i className="fas fa-wallet"></i>),
      (<i className="fas fa-credit-card"></i>),
      (<i className="fas fa-money-check"></i>),
      (<i className="fas fa-dollar-sign"></i>),
      (<i className="fas fa-chart-line"></i>),
      (<i className="fas fa-chart-pie"></i>),
      (<i className="fas fa-money-check-alt"></i>),
      (<i className="fas fa-receipt"></i>),
      (<i className="fas fa-shopping-cart"></i>),
      (<i className="fas fa-coffee"></i>),
      (<i className="fas fa-utensils"></i>),
      (<i className="fas fa-car"></i>),
      (<i className="fas fa-gas-pump"></i>),
      (<i className="fas fa-home"></i>),
      (<i className="fas fa-plane"></i>)
    ];

    return (
      <div className="tracker">
        <div className="tracker-icon">
          {iconArray[(Math.floor(Math.random() * iconArray.length))]}
        </div>
        <div className="tracker-name">
          {TrackerName}
        </div>
        <div className="tracker-options">
          <div className="tracker-edit" title='Edit'>
            <i className="fa-regular fa-pen-to-square" title='Edit'></i>
          </div>
          <div className="tracker-delete" title='Delete'>
            <i className="fa-solid fa-trash" title='Delete'></i>
          </div>
        </div>
      </div>
    )
  }

  const handleOpenDialog = () => {
    setShowDialog(true);
    document.getElementById('tracker-input').focus();
  };

  const handleSave = () => {
    console.log(`Tracker Name : ${trackerName}`);
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setTrackerName('')
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSave();
    }
  };

  return (
    <div>
      <div className="sidebar" id="sidebar">
        <div className="top-btn" onClick={handleOpenDialog}>
          <div className="top-btn-content">New Tracker +</div>
        </div>

        <div className="bottom-div">
          <div className="tracker-list">
            {buildTracker('Expenses')}
          </div>
        </div>
      </div>

      <div className={`custom-dialog ${showDialog ? 'show' : 'hide'}`}>
        <div className="dialog-content">
          <p className='dialog-head'>Tracker Name</p>
          <input
            type="text"
            value={trackerName}
            onChange={(e) => setTrackerName(e.target.value)}
            className="tracker-input"
            id='tracker-input'
            placeholder='Enter Tracker Name'
            onKeyDown={handleKeyDown}
          />
          <div className="btn-container">
            <button onClick={handleSave} className="save-btn button">Save</button>
            <button onClick={handleCloseDialog} className="cancel-btn button">Cancel</button>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Sidebar;
