import React, { useState, useEffect } from 'react';
import { database } from '../Auth/firebase';
import { ref, set, get } from 'firebase/database';
import Cookies from 'js-cookie';

function Sidebar(props) {
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


  const [showDialog, setShowDialog] = useState(false);
  const [trackerName, setTrackerName] = useState('');
  const [trackers, setTrackers] = useState([]);
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
      if (!userId) throw new Error('User ID not found');

      const userRef = ref(database, `Users/${userId}/Tracker`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const trackersArray = Object.keys(data).map(trackerName => ({
          name: trackerName,
          expenseData: data[trackerName].expenseData,
          icon: data[trackerName].icon
        }));
        setTrackers(trackersArray);
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching trackers:', error);
    }
  };

  console.log(trackers)

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
      if (!userId) throw new Error('User ID not found');

      const userRef = ref(database, `Users/${userId}/Tracker/${trackerName}`);

      try {
        const randomIndex = Math.floor(Math.random() * dummyItems.length);
        const randomItem = dummyItems[randomIndex];
        const randomAmount = Math.floor(Math.random() * 100) + 1;

        const expenseData = {
          [randomItem]: randomAmount
        };

        let newTracker = { expenseData, icon: `${iconArray[(Math.floor(Math.random() * iconArray.length))]}` };

        await set(userRef, newTracker);

        setTrackers(prevTrackers => [...prevTrackers, { name: trackerName, ...newTracker }]);
      } catch (error) {
        console.error('Error adding random expense:', error);
      }


    } catch (error) {
      console.error('Error saving tracker:', error);
    }
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
    setTimeout(() => {
      document.getElementById('tracker-input').focus();
    }, 0);
  };

  const handleSave = () => {
    console.log(`Tracker Name : ${trackerName}`);
    saveTracker(trackerName);
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setTrackerName('');
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

            {trackers.map((tracker) => (
              <div key={tracker.name} className="tracker">
                <div className="tracker-icon">
                  {iconArray[(Math.floor(Math.random() * iconArray.length))]}
                </div>
                <div className="tracker-name">
                  {tracker.name}
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
            ))}

          </div>
        </div>
      </div>

      <div className={`custom-dialog ${showDialog ? 'show' : 'hide'}`}>
        <div className="dialog-content">
          <p className='dialog-head'>Tracker Name</p>
          <input
            type="text"
            value={trackerName}
            onChange={(e) => setTrackerName(e.target.value.replace(/\s/g, ''))}
            className="tracker-input"
            id='tracker-input'
            placeholder='Enter Tracker Name'
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
