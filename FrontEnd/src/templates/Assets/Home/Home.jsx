import React from 'react'
import Sidebar from './Sidebar'
import MainContent from './mainContent'

function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <MainContent />
        </div>
      </div>
    </div>
  )
}

export default Home
