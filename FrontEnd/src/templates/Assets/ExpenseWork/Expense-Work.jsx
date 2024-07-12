import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import ExpenseContent from './Expense-content';

function ExpenseWork(props) {
  const [currentTracker, setCurrentTracker] = useState(null);

  const handleSelect = (tracker) => {
    setCurrentTracker(tracker);
  };

  useEffect(() => {
  }, [currentTracker]);

  return (
    <div className='Ex-div'>
      <Sidebar onSelect={handleSelect} />
      <ExpenseContent currentTracker={currentTracker} />
    </div>
  );
}

export default ExpenseWork;
