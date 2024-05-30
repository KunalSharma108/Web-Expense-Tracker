import React, { useRef, useState, useEffect } from 'react';

function Sidebar(props) {
  const [showDialog, setShowDialog] = useState(false);
  const [trackerName, setTrackerName] = useState('');

  return (
    <div>
      <div className="sidebar">
        <div className="top-btn" onClick={handleOpenDialog}>
          <div className="top-btn-content">New Tracker</div>
        </div>
      </div>

      <div className={`custom-dialog ${showDialog == false ? 'hidden' : null}`}>
        <div className="dialog-content">
          <h2>Enter Tracker Name</h2>
          <input
            type="text"
            value={trackerName}
            onChange={(e) => setTrackerName(e.target.value)}
            className="tracker-input"
          />
          <div className="btn-container">
            <button onClick={handleSave} className="save-btn">Save</button>
            <button onClick={handleCloseDialog} className="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
