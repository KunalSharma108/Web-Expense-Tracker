import React, { useState } from 'react';
import { database } from '../Auth/firebase';

function Sidebar(props) {
  const [showDialog, setShowDialog] = useState(false);
  const [trackerName, setTrackerName] = useState('');

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
