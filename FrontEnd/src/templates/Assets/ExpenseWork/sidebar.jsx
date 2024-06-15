import React, { useState, useEffect } from 'react';
import { database } from '../Auth/firebase';
import { ref, update, get, remove, set } from 'firebase/database';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onSelect }) => {
  const navigate = useNavigate();
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

  const [trackerState, setTrackerstate] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [trackerName, setTrackerName] = useState('');
  const [trackers, setTrackers] = useState([]);
  const [selectedTracker, setSelectedTracker] = useState('');

  const maxCharLimit = 10;

  useEffect(() => {
    fetchTrackers();
  }, []);

  const getUserIdFromEmail = () => {
    const email = Cookies.get('Email');
    return email ? email.split('@')[0] : null;
  };

  const fetchTrackers = async () => {
    try {
      const userId = getUserIdFromEmail();
      if (!userId) {
        window.alert('There was a problem with your Email, Need to sign out urgently.');
        Cookies.remove('displayName');
        Cookies.remove('Email');
        navigate('/');
        window.location.reload();
        return;
      }

      const userRef = ref(database, `Users/${userId}/Tracker`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const trackersArray = Object.keys(data).map(trackerName => ({
          name: trackerName,
          expenseData: data[trackerName].expenseData,
        }));
        setTrackers(trackersArray);
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching trackers:', error);
    }
  };

  const saveTracker = async (trackerName) => {
    try {
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

      const userId = getUserIdFromEmail();
      if (!userId) {
        window.alert('There was a problem with your Email, Need to sign out urgently.');
        Cookies.remove('displayName');
        Cookies.remove('Email');
        navigate('/');
        window.location.reload();
        return;
      }

      const userRef = ref(database, `Users/${userId}/Tracker/${trackerName}`);

      try {
        const randomIndex = Math.floor(Math.random() * dummyItems.length);
        const randomItem = dummyItems[randomIndex];
        const randomAmount = Math.floor(Math.random() * 100) + 1;

        const expenseData = {
          [randomItem]: randomAmount
        };

        let newTracker = { expenseData };

        await set(userRef, newTracker);

        setTrackers(prevTrackers => [...prevTrackers, { name: trackerName, ...newTracker }]);
      } catch (error) {
        console.error('Error adding random expense:', error);
      }


    } catch (error) {
      console.error('Error saving tracker:', error);
    }
  };

  const handleAddOpenDialog = () => {
    setTrackerstate('Add Tracker');
    setShowDialog(true);
    setTimeout(() => {
      document.getElementById('tracker-input').focus();
    }, 0);
  };

  const handleEditOpenDialog = (trackerName) => {
    setSelectedTracker(trackerName);
    setTrackerstate('Edit Tracker');
    setShowDialog(true);

    setTimeout(() => {
      document.getElementById('tracker-input').focus();
    }, 0);
  }

  const deleteTracker = (trackerName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the tracker : "${trackerName}"?`);

    if (confirmDelete) {
      try {
        const userId = getUserIdFromEmail();
        if (!userId) {
          window.alert('There was a problem with your Email, Need to sign out urgently.');
          Cookies.remove('displayName');
          Cookies.remove('Email');
          navigate('/');
          window.location.reload();
          return;
        }

        const trackerRef = ref(database, `Users/${userId}/Tracker/${trackerName}`);
        remove(trackerRef)
          .catch(error => console.error('Error deleting tracker:', error));

        setTrackers(prevTrackers => prevTrackers.filter(tracker => tracker.name !== trackerName));

        if (onSelect) {
          onSelect(null);
        }

      } catch (error) {
        console.error('Error deleting tracker:', error);
      }
    }
  };

  const editTracker = async () => {
    try {
      const userId = getUserIdFromEmail();
      if (!userId) {
        window.alert('There was a problem with your Email, Need to sign out urgently.');
        Cookies.remove('displayName');
        Cookies.remove('Email');
        navigate('/');
        window.location.reload();
        return;
      }

      const updates = {};

      updates[`Users/${userId}/Tracker/${trackerName}`] = await get(ref(database, `Users/${userId}/Tracker/${selectedTracker}`))
        .then(snapshot => snapshot.val());

      updates[`Users/${userId}/Tracker/${selectedTracker}`] = null;
      await update(ref(database), updates);

      setTrackers(prevTrackers =>
        prevTrackers.map(tracker =>
          tracker.name === selectedTracker ? { ...tracker, name: trackerName } : tracker
        )
      );

      if (onSelect) {
        onSelect(null);
      }

    } catch (error) {
      console.error('Error updating tracker:', error);
    }
  };

  const handleSave = () => {
    if (trackerState.trim() === 'Add Tracker') {
      saveTracker(trackerName);
    } else if (trackerState.trim() === 'Edit Tracker') {
      editTracker();
    } else {
      window.alert('An error occurred, need to refresh the web page.');
      window.location.reload();
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setTrackerName('');
    setTrackerstate('');
    setSelectedTracker('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSave();
    }
  };

  const handleDivClick = (content) => {
    if (onSelect) {
      onSelect(content);
    }
  };

  return (
    <div>
      <div className="sidebar" id="sidebar">
        <div className="top-btn" onClick={handleAddOpenDialog}>
          <div className="top-btn-content">New Tracker +</div>
        </div>

        <div className="bottom-div">
          <div className="tracker-list">

            {trackers.map((tracker) => (
              <div
                key={tracker.name}
                className="tracker"
                onClick={() => handleDivClick(tracker.name)}
              >
                <div className="tracker-icon">
                  {iconArray[Math.floor(Math.random() * iconArray.length)]}
                </div>
                <div className="tracker-name">
                  {tracker.name}
                </div>
                <div className="tracker-options">
                  <div className="tracker-edit" title="Edit" onClick={(e) => {
                    e.stopPropagation();
                    handleEditOpenDialog(tracker.name);
                  }}>
                    <i className="fa-regular fa-pen-to-square" title="Edit"></i>
                  </div>
                  <div className="tracker-delete" title="Delete" onClick={(e) => {
                    e.stopPropagation();
                    deleteTracker(tracker.name);
                  }}>
                    <i className="fa-solid fa-trash" title="Delete"></i>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      <div className={`custom-dialog ${showDialog ? 'show' : 'hide'}`}>
        <div className="dialog-content">
          <p className="dialog-head">{trackerState}</p>
          <input
            type="text"
            value={trackerName}
            onChange={(e) => setTrackerName(e.target.value.replace(/\s/g, ''))}
            className="tracker-input"
            id="tracker-input"
            placeholder="Enter Tracker Name"
            onKeyDown={handleKeyDown}
            maxLength={maxCharLimit}
          />
          <div className="char-limit">
            {trackerName.length}/{maxCharLimit}
          </div>
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
