import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import ExpenseContent from './Expense-content';

function ExpenseWork(props) {
  const [currentTracker, setCurrentTracker] = useState(null);

  const handleSelect = (tracker) => {
    console.log("Tracker selected:", tracker);
    setCurrentTracker(tracker);
    console.log(`this is right below : ${currentTracker}`)
  };

  useEffect(() => {
    console.log("Current Tracker Updated:", currentTracker);
  }, [currentTracker]);

  return (
    <div className='Ex-div'>
      <Sidebar onSelect={handleSelect} />
      <ExpenseContent currentTracker={currentTracker} />
    </div>
  );
}

export default ExpenseWork;
